import {Timestamp} from "rxjs";
import {IdentificationTypeInterface} from "./identification-type.interface";

export interface PersonInterface {
    id?: number | null;
    kind_person: string;
    identificationType: IdentificationTypeInterface | null;
    identification_number: string;
    name: string | null;
    first_surname: string | null;
    second_surname: string | null;
    business_name: string | null;
    birthday: Date | string | null;
    gender: string | null;
    address: string;
    first_phone: string | null;
    second_phone: string | null;
    state: boolean;
    created_at?: Timestamp<any>;
    updated_at?: Timestamp<any>;
}
