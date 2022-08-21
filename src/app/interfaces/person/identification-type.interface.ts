export interface IdentificationTypeInterface {
    id?: number | null;
    code: string;
    name: string;
    description: string;
    number_digits: string | number;
    state: boolean;
}
