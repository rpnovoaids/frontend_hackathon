import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from "@angular/forms";

import {ConfirmationService} from "primeng/api";

import {Person} from "../../../models/person/person.model";
import {IdentificationType} from "../../../models/person/identification-type.model";

import {PersonService} from "../../../services/person/person.service";
import {HelperService} from "../../../services/helper/helper.service";

export interface KindPerson {
    header: string;
    value: string;
}

export interface Gender {
    header: string;
    value: string;
}

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styles: [`
        .field {
            margin-bottom: -1rem;
        }
    `]
})
export class PersonComponent implements OnInit {

    person: Person = new Person()
    persons: Person[] = [];

    identificationTypes: IdentificationType[] = [];

    kindPerson: KindPerson | null = null;
    kindPersons: KindPerson[] = [];

    gender: Gender | null = null;
    genders: Gender[] = [];

    requiredIdentificationNumber: boolean = true;
    displayDialogPerson: boolean = false;

    @Output() emitPerson = new EventEmitter<Person>();

    constructor(
        private _ConfirmationService: ConfirmationService,
        public _HelperService: HelperService,
        public _PersonService: PersonService
    ) {
        this.kindPersons = [
            {header: 'NATURAL', value: 'N'},
            {header: 'JURÍDICA', value: 'J'}
        ];
        this.genders = [
            {header: 'MASCULINO', value: 'M'},
            {header: 'FEMENINO', value: 'F'}
        ];
    }

    ngOnInit(): void {
    }

    onInitial() {
        this._PersonService.identificationType_index('').subscribe(
            res => {
                this.identificationTypes = res.object;
            }
        )
    }

    onDisplayDialogPerson(person: Person): void {
        this.setPerson(person);
        this.displayDialogPerson = true;
    }

    onSubmit(): void {
        this._HelperService.showLoading();
        if (!this.person.id) {
            this._PersonService.person_store(this.person).subscribe(
                res => {
                    this.emitPerson.emit(res.object);
                    this._HelperService.messageSnotifyToastCrud('r');
                }
            );
        } else {
            this._PersonService.person_update(this.person).subscribe(
                res => {
                    this.emitPerson.emit(this.person);
                    this._HelperService.messageSnotifyToast();
                }
            );
        }
        this.displayDialogPerson = false;
    }

    onClickSearch(number: NgModel): void {
        if (number.valid) {
            this._HelperService.showLoading();
            let query = 'identificationType=' + this.person.identificationType?.id;
            query += '&number=' + this.person.identification_number;
            this._PersonService.person_findFields(query).subscribe(
                res => {
                    this._HelperService.hideLoading();
                    if (res.object) {
                        this.onClickConfirmCompletePerson(res.object)
                    } else {
                        this._HelperService.messagePrimengToast('i', '¡Atención!', 'Documento no registrado.');
                    }
                }
            );
        }
    }

    onChangeKindPerson(kindPerson: KindPerson): void {
        this.person.kind_person = kindPerson.value;
        if (kindPerson.value === 'J') {
            const identificationType = this.identificationTypes.find(item => item.code === '06');
            this.person.identificationType = identificationType ? identificationType : null;
            this.person.name = null;
            this.person.first_surname = null;
            this.person.second_surname = null;
            this.person.birthday = null;
            this.person.gender = null;
        } else {
            this.person.business_name = null;
        }
    }

    onChangeGender(gender: Gender): void {
        this.person.gender = gender.value;
    }

    onChangeIdentificationType(identificationType: IdentificationType): void {
        this.requiredIdentificationNumber = identificationType.code != '13';
        if (identificationType.code == '06') {
            this.person.name = null;
            this.person.first_surname = null;
            this.person.second_surname = null;
        } else {
            this.person.business_name = null;
        }
    }

    onClickConfirmCompletePerson(person: Person): void {
        this._ConfirmationService.confirm({
            message: '¿Desea actualizar sus datos?',
            header: '¡El Cliente ya está registrado!',
            icon: 'pi pi-info-circle',
            accept: () => {
                this._HelperService.messagePrimengToast('', '', 'Datos Rellenados.');
                this.setPerson(person);
                this.emitPerson.emit(this.person);
            }
        });
    }

    onClickConfirmDestroyPerson(person: Person): void {
        this._ConfirmationService.confirm({
            message: '¿Desea eliminar el Cliente?',
            header: '¡El Cliente ya está registrado!',
            icon: 'pi pi-info-circle',
            accept: () => {
                this._PersonService.person_destroy(person).subscribe(
                    res => {
                        this.emitPerson.emit(person);
                        this._HelperService.messageSnotifyToast('d');
                    }
                );
            },
            reject: (type: any) => {
                this._HelperService.messagePrimengToast('i', '', 'El Usuario canceló la acción.')
            }
        });
    }

    setPerson(person: Person): void {
        const kindPerson = this.kindPersons.find(item => item.value === person.kind_person);
        this.kindPerson = kindPerson ? kindPerson : null;
        const gender = this.genders.find(item => item.value === person.gender);
        this.gender = gender ? gender : null;
        person.birthday = person.birthday ? new Date(person.birthday + ' 00:00:00') : null;
        this.person = person;
    }
}
