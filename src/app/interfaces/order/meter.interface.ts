import {Timestamp} from "rxjs";
import {MeterTypeInterface} from "./meter-type.interface";

export interface MeterInterface {
    id?: number | null;
    meterType: MeterTypeInterface | null;
    meter_number: string;
    meter_status: string;
    state: boolean;
    created_at?: Timestamp<any>;
    updated_at?: Timestamp<any>;
}
