import {ICategory} from "./ICategory";
import {IEmployee} from "./IEmployee";
import {Priority} from "./Priority";
import {IDocumentModel} from "./DocumentModel";
import {IUser} from "./User";

export interface ITask {
  id:number;
  title:string;
  reference:string;
  completed:number;
  strDateControl:String;
  dateControl:Date;
  note:string;
  documents:IDocumentModel[];
  priority:Priority;
  employee:IEmployee;
  category:ICategory;
  teamlieder:string;
}

export class CurrentTask implements ITask{
  category: ICategory;
  categoryId: number;
  dateControl: Date;
  documents: IDocumentModel[];
  employee: IEmployee;
  employeeId: number;
  id: number;
  note: string;
  priority: Priority;
  priorityId: number;
  title: string;
  reference: string;
  completed:number;
  strDateControl:string;
  teamlieder: string;

  constructor(category: ICategory, categoryId: number, dateControl: Date, documents: IDocumentModel[], employee: IEmployee, employeeId: number, id: number, note: string, priority: Priority, priorityId: number, title: string, reference: string, teamlieder: string) {
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
    this.teamlieder = teamlieder;
  }
}
