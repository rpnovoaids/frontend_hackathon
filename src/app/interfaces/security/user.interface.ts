import {Timestamp} from "rxjs";
import {PersonInterface} from "../person/person.interface";

export interface UserInterface {
  id?: string;
  person: PersonInterface;
  email: string;
  password: string;
  active: boolean;
  state: boolean;
  created_at?: Timestamp<any>;
  updated_at?: Timestamp<any>;
}
