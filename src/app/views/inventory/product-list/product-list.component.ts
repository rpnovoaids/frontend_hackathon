import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";

import {Meter} from "../../../models/order/meter.model";
import {CollTable} from "../../../interfaces/http/coll-table";

import {HelperService} from "../../../services/helper/helper.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MeterService} from "../../../services/order/meter.service";

import {MeterComponent} from "../../shared/meter/meter.component";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styles: [`
        :host ::ng-deep .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height: .5rem;
        }

        :host ::ng-deep .p-action-button {
            vertical-align: middle;
            display: flex;
            flex-direction: row;
            gap: 5px;
        }
    `]
})
export class ProductListComponent implements OnInit {

    meter: Meter = new Meter()
    meters: Meter[] = [];

    selectedMeters: Meter[] = [];

    meterColumns: CollTable[] = [];
    selectedMeterColumns: CollTable[] = [];
    meterFilter: string[] = [];

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild(MeterComponent) meterComponent: any = null;

    constructor(
        public _HelperService: HelperService,
        private _AuthService: AuthService,
        private _MeterService: MeterService
    ) {
    }

    ngOnInit(): void {
        this._HelperService.showLoading();
        this.tableLoad().then(() => {
            this._MeterService.meter_index('').subscribe(
                res => {
                    this.meters = res.object;
                    this.loadMeters(true);
                }
            );
        });
    }

    private async tableLoad() {
        await this._MeterService.person_col_table().then(data => this.meterColumns = data);
        await this._MeterService.person_col_table_default().then(cols => this.selectedMeterColumns = cols);
        await this._MeterService.person_col_table_filter().then(filter => this.meterFilter = filter);
    }

    loadMeters(initialOtherComponent: boolean): void {
        this._MeterService.meter_index('?state=1&order=desc').subscribe(
            res => {
                this.meters = res.object;
                initialOtherComponent ? this.meterComponent.onInitial() : false;
                this._HelperService.hideLoading();
            }
        );
    }

    onDisplayDialogMeter(meter: Meter | null): void {
        this.meter = meter ? {...meter} : new Meter();
        this.meterComponent.onDisplayDialogMeter(this.meter);
    }

    onClickDestroyMeter(meter: Meter): void {
        this.meterComponent.onClickConfirmDestroyMeter(meter);
    }

    getMeter(meter: Meter): void {
        this.loadMeters(false);
    }

    onClickClear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
