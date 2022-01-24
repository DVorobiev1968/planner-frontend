import {ERole} from "./ERole";

export interface User {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  initial:string;
  roles:ERole[];
}
