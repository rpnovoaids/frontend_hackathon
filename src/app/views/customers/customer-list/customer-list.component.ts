import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";

import {Person} from "../../../models/person/person.model";
import {CollTable} from "../../../interfaces/http/coll-table";

import {HelperService} from "../../../services/helper/helper.service";
import {AuthService} from "../../../services/auth/auth.service";
import {PersonService} from "../../../services/person/person.service";
import {PersonComponent} from "../../shared/person/person.component";

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }

        :host ::ng-deep  .p-action-button {
            vertical-align: middle;
            display: flex;
            flex-direction: row;
            gap: 5px;
        }
    `]
})
export class CustomerListComponent implements OnInit {

    person: Person = new Person()
    persons: Person[] = [];

    selectedPersons: Person[] = [];

    personColumns: CollTable[] = [];
    selectedPersonColumns: CollTable[] = [];
    personFilter: string[] = [];

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild(PersonComponent) personComponent: any = null;

    constructor(
        public _HelperService: HelperService,
        private _AuthService: AuthService,
        private _PersonService: PersonService
    ) {
    }

    ngOnInit(): void {
        this._HelperService.showLoading();
        this.tableLoad().then(() => {
            this._PersonService.person_index('').subscribe(
                res => {
                    this.persons = res.object;
                    this.loadPersons(true);
                }
            );
        });
    }

    private async tableLoad() {
        await this._PersonService.person_col_table().then(data => this.personColumns = data);
        await this._PersonService.person_col_table_default().then(cols => this.selectedPersonColumns = cols);
        await this._PersonService.person_col_table_filter().then(filter => this.personFilter = filter);
    }

    loadPersons(initialOtherComponent: boolean): void {
        this._PersonService.person_index('?state=1&order=desc').subscribe(
            res => {
                this.persons = res.object;
                initialOtherComponent ? this.personComponent.onInitial() : false;
                this._HelperService.hideLoading();
            }
        );
    }

    onDisplayDialogPerson(person: Person | null): void {
        this.person = person ? {...person} : new Person();
        this.personComponent.onDisplayDialogPerson(this.person);
    }

    onClickDestroyPerson(person: Person): void {
        this.personComponent.onClickConfirmDestroyPerson(person);
    }

    getPerson(person: Person): void {
        this.loadPersons(false);
    }

    getBusinessName(person: Person): string {
        if (!person.business_name) {
            let business_name: string = person.name + ' ';
            business_name += person.first_surname + ' ';
            business_name += person.second_surname;
            return business_name;
        }
        return person.business_name;
    }

    onClickClear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
