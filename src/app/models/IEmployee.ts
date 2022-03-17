export interface IEmployee {
  id?: number;
  firstname: string;
  lastname: string;
  fio: string;
  patronymic: string;
  initial: string;
}
export class Employee implements IEmployee{
  firstname: string;
  lastname: string;

  constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.fio="";
    this.patronymic="";
    this.initial="";
  }

  fio: string;
  initial: string;
  patronymic: string;
}
