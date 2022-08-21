import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AuthService} from "../auth/auth.service";

import {JsonResponse} from "../../interfaces/http/json.response";
import {CollTable} from "../../interfaces/http/coll-table";

import {Person} from "../../models/person/person.model";
import {IdentificationType} from "../../models/person/identification-type.model";

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    private urlPerson = this._AuthService.url + '/persons';
    private urlIdentificationType = this._AuthService.url + '/identificationTypes';

    constructor(
        private _HttpClient: HttpClient,
        private _AuthService: AuthService
    ) {
    }

    /**
     * default_settings
     */
    person_col_table() {
        return this._HttpClient.get<any>('assets/data/table/person-colltable.json')
            .toPromise()
            .then(res => res.data as CollTable[])
            .then(data => data);
    }

    person_col_table_default() {
        return this._HttpClient.get<any>('assets/data/table/person-colltable-default.json')
            .toPromise()
            .then(res => res.data as CollTable[])
            .then(data => data);
    }

    person_col_table_filter() {
        return this._HttpClient.get<any>('assets/data/table/person-filter.json')
            .toPromise()
            .then(res => res.data as string[])
            .then(data => data);
    }

    /**
     * person
     */
    person_index(query: string) {
        return this._HttpClient.get<JsonResponse>(this.urlPerson + query, this._AuthService.headers());
    }

    person_store(person: Person) {
        return this._HttpClient.post<JsonResponse>(this.urlPerson, person, this._AuthService.headers());
    }

    person_show(person: Person) {
        return this._HttpClient.get<JsonResponse>(this.urlPerson + '/' + person.id, this._AuthService.headers());
    }

    person_update(person: Person) {
        return this._HttpClient.put<JsonResponse>(this.urlPerson + '/' + person.id, person, this._AuthService.headers());
    }

    person_destroy(person: Person) {
        return this._HttpClient.delete<JsonResponse>(this.urlPerson + '/' + person.id, this._AuthService.headers());
    }

    person_findFields(query: string) {
        return this._HttpClient.get<JsonResponse>(this.urlPerson + '/filter?' + query, this._AuthService.headers());
    }

    /**
     * identificationType
     */
    identificationType_index(query: string) {
        return this._HttpClient.get<JsonResponse>(this.urlIdentificationType + query, this._AuthService.headers());
    }

    identificationType_store(identificationType: IdentificationType) {
        return this._HttpClient.post<JsonResponse>(this.urlIdentificationType, identificationType,
            this._AuthService.headers());
    }

    identificationType_show(identificationType: IdentificationType) {
        return this._HttpClient.get<JsonResponse>(this.urlIdentificationType + '/' + identificationType.id,
            this._AuthService.headers());
    }

    identificationType_update(identificationType: IdentificationType) {
        return this._HttpClient.put<JsonResponse>(this.urlIdentificationType + '/' + identificationType.id, identificationType,
            this._AuthService.headers());
    }

    identificationType_destroy(identificationType: IdentificationType) {
        return this._HttpClient.delete<JsonResponse>(this.urlIdentificationType + '/' + identificationType.id,
            this._AuthService.headers());
    }
}
