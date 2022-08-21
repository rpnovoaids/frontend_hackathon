import {PersonInterface} from "../person/person.interface";

export interface AuthenticatedUserInterface {
  id: string;
  person: PersonInterface;
  username: string;
  active: boolean;
}
