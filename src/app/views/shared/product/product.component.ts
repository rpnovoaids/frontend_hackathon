import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModel} from "@angular/forms";

import {ConfirmationService} from "primeng/api";

import {Meter} from "../../../models/order/meter.model";
import {MeterType} from "../../../models/order/meter-type.model";

import {HelperService} from "../../../services/helper/helper.service";
import {MeterService} from "../../../services/order/meter.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styles: [`
        .field {
            margin-bottom: -0.5rem;
        }
    `]
})
export class ProductComponent implements OnInit {

    meter: Meter = new Meter()
    meters: Meter[] = [];

    meterTypes: MeterType[] = [];

    meterStatus: string[] = [];

    displayDialogMeter: boolean = false;

    @Output() emitMeter = new EventEmitter<Meter>();

    constructor(
        private _ConfirmationService: ConfirmationService,
        public _HelperService: HelperService,
        public _MeterService: MeterService
    ) {
        this.meterStatus = ['BUENO', 'REGULAR', 'AVERIADO'];
    }

    ngOnInit(): void {
    }

    onInitial() {
        this._MeterService.meterType_index('').subscribe(
            res => {
                this.meterTypes = res.object;
            }
        )
    }

    onDisplayDialogMeter(meter: Meter): void {
        this.meter = meter;
        this.displayDialogMeter = true;
    }

    onSubmit(): void {
        this._HelperService.showLoading();
        if (!this.meter.id) {
            this._MeterService.meter_store(this.meter).subscribe(
                res => {
                    this.emitMeter.emit(res.object);
                    this._HelperService.messageSnotifyToastCrud('r');
                }
            );
        } else {
            this._MeterService.meter_update(this.meter).subscribe(
                res => {
                    this.emitMeter.emit(this.meter);
                    this._HelperService.messageSnotifyToast();
                }
            );
        }
        this.displayDialogMeter = false;
    }

    onClickSearch(number: NgModel): void {
        if (number.valid) {
            this._HelperService.showLoading();
            let query = 'number=' + this.meter.meter_number;
            this._MeterService.meter_findFields(query).subscribe(
                res => {
                    this._HelperService.hideLoading();
                    if (res.object) {
                        this.onClickConfirmCompleteMeter(res.object)
                    } else {
                        this._HelperService.messagePrimengToast('i', '??Atenci??n!', 'Medidor no registrado.');
                    }
                }
            );
        }
    }

    onClickConfirmCompleteMeter(meter: Meter): void {
        this._ConfirmationService.confirm({
            message: '??Desea actualizar sus datos?',
            header: '??El Medidor ya est?? registrado!',
            icon: 'pi pi-info-circle',
            accept: () => {
                this._HelperService.messagePrimengToast('', '', 'Datos Rellenados.');
                this.meter = meter;
                this.emitMeter.emit(this.meter);
            }
        });
    }

    onClickConfirmDestroyMeter(meter: Meter): void {
        this._ConfirmationService.confirm({
            message: '??Desea eliminar el Medidor?',
            header: '??Confirme la acci??n!',
            icon: 'pi pi-info-circle',
            accept: () => {
                this._MeterService.meter_destroy(meter).subscribe(
                    res => {
                        this.emitMeter.emit(meter);
                        this._HelperService.messageSnotifyToast('d');
                    }
                );
            },
            reject: (type: any) => {
                this._HelperService.messagePrimengToast('i', '', 'El Usuario cancel?? la acci??n.')
            }
        });
    }
}
