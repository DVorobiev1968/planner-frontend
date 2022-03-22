import {ERole, IRole, Role} from "./ERole";

export interface IUser {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  initial:string;
  roles?:ERole[];
  fio:string;
}
export class User implements IUser{
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  initial:string;
  fio:string;

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
export class UserRoles extends User{
  public roles:Role;
  constructor(id: number, email: string, username: string, firstname: string, lastname: string, patronymic: string, initial: string, eRole:any) {
    super(id, email, username, firstname, lastname, patronymic, initial);
    this.roles=new Role();
    this.roles.setRoles(eRole);
    super.fio=lastname+" "+initial;
  }
}
