import {MeterTypeInterface} from "../../interfaces/order/meter-type.interface";

export class MeterType implements MeterTypeInterface {

    id?: string | null;
    name: string;
    description: string;
    state: boolean;

    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.state = true;
    }
}
