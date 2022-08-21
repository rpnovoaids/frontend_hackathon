import {MeterInterface} from "../../interfaces/order/meter.interface";
import {MeterTypeInterface} from "../../interfaces/order/meter-type.interface";
import {Timestamp} from "rxjs";

export class Meter implements MeterInterface {

    id?: number | null;
    meterType: MeterTypeInterface | null;
    meter_number: string;
    meter_status: string;
    state: boolean;
    created_at?: Timestamp<any>;
    updated_at?: Timestamp<any>;

    constructor() {
        this.id = null;
        this.meterType = null;
        this.meter_number = '';
        this.meter_status = '';
        this.state = true;
    }
}
