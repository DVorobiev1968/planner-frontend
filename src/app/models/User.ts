import {ERole} from "./ERole";

export interface User {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  initial:string;
  roles?:ERole[];
}
export class UserClass implements User{
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  initial:string;

  constructor (id:number, email:string, username:string, firstname:string, lastname:string, patronymic:string, initial:string){
    this.id=id;
    this.email=email;
    this.username=username;
    this.firstname=firstname;
    this.lastname=lastname;
    this.patronymic=patronymic;
    this.initial=initial;
  }
}
