import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AuthService} from "../auth/auth.service";

import {JsonResponse} from "../../interfaces/http/json.response";
import {CollTable} from "../../interfaces/http/coll-table";

import {Meter} from "../../models/order/meter.model";
import {MeterType} from "../../models/order/meter-type.model";

@Injectable({
    providedIn: 'root'
})
export class MeterService {

    private urlMeter = this._AuthService.url + '/meters';
    private urlMeterType = this._AuthService.url + '/meterTypes';

    constructor(
        private _HttpClient: HttpClient,
        private _AuthService: AuthService
    ) {
    }

    /**
     * default_settings
     */
    person_col_table() {
        return this._HttpClient.get<any>('assets/data/table/meter-colltable.json')
            .toPromise()
            .then(res => res.data as CollTable[])
            .then(data => data);
    }

    person_col_table_default() {
        return this._HttpClient.get<any>('assets/data/table/meter-colltable-default.json')
            .toPromise()
            .then(res => res.data as CollTable[])
            .then(data => data);
    }

    person_col_table_filter() {
        return this._HttpClient.get<any>('assets/data/table/meter-filter.json')
            .toPromise()
            .then(res => res.data as string[])
            .then(data => data);
    }

    /**
     * person
     */
    meter_index(query: string) {
        return this._HttpClient.get<JsonResponse>(this.urlMeter + query, this._AuthService.headers());
    }

    meter_store(meter: Meter) {
        return this._HttpClient.post<JsonResponse>(this.urlMeter, meter, this._AuthService.headers());
    }

    meter_show(meter: Meter) {
        return this._HttpClient.get<JsonResponse>(this.urlMeter + '/' + meter.id, this._AuthService.headers());
    }

    meter_update(meter: Meter) {
        return this._HttpClient.put<JsonResponse>(this.urlMeter + '/' + meter.id, meter, this._AuthService.headers());
    }

    meter_destroy(meter: Meter) {
        return this._HttpClient.delete<JsonResponse>(this.urlMeter + '/' + meter.id, this._AuthService.headers());
    }

    meter_findFields(query: string) {
        return this._HttpClient.get<JsonResponse>(this.urlMeter + '/filter?' + query, this._AuthService.headers());
    }

    /**
     * meterType
     */
    meterType_index(query: string) {
        return this._HttpClient.get<JsonResponse>(this.urlMeterType + query, this._AuthService.headers());
    }

    meterType_store(meterType: MeterType) {
        return this._HttpClient.post<JsonResponse>(this.urlMeterType, meterType, this._AuthService.headers());
    }

    meterType_show(meterType: MeterType) {
        return this._HttpClient.get<JsonResponse>(this.urlMeterType + '/' + meterType.id,
            this._AuthService.headers());
    }

    meterType_update(meterType: MeterType) {
        return this._HttpClient.put<JsonResponse>(this.urlMeterType + '/' + meterType.id, meterType,
            this._AuthService.headers());
    }

    meterType_destroy(meterType: MeterType) {
        return this._HttpClient.delete<JsonResponse>(this.urlMeterType + '/' + meterType.id,
            this._AuthService.headers());
    }
}
