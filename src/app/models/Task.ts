import {Category} from "./Category";
import {Employee} from "./Employee";
import {Priority} from "./Priority";
import {DocumentModel} from "./DocumentModel";
import {IUser} from "./User";

export interface Task{
  id:number;
  title:string;
  reference:string;
  completed:number;
  strDateControl:String;
  dateControl:Date;
  note:string;
  documents:DocumentModel[];
  priorityId:number;
  priority:Priority;
  employeeId:number;
  employee:Employee;
  category:Category;
  categoryId:number;
  user:IUser;
}

export class CurrentTask implements Task{
  category: Category;
  categoryId: number;
  dateControl: Date;
  documents: DocumentModel[];
  employee: Employee;
  employeeId: number;
  id: number;
  note: string;
  priority: Priority;
  priorityId: number;
  title: string;
  reference: string;
  completed:number;
  strDateControl:String;
  user: IUser;

  constructor(category: Category, categoryId: number, dateControl: Date, documents: DocumentModel[], employee: Employee, employeeId: number, id: number, note: string, priority: Priority, priorityId: number, title: string, reference: string, user: IUser) {
    this.category = category;
    this.categoryId = categoryId;
    this.dateControl = dateControl;
    this.documents = documents;
    this.employee = employee;
    this.employeeId = employeeId;
    this.id = id;
    this.note = note;
    this.priority = priority;
    this.priorityId = priorityId;
    this.title = title;
    this.reference = reference;
    this.user = user;
  }
}
