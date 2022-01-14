import {Category} from "./Category";
import {Employee} from "./Employee";
import {Priority} from "./Priority";
import {DocumentModel} from "./DocumentModel";
import {User} from "./User";

export interface Task{
  id?:number;
  title:string;
  completed?:number;
  strDateControl?:String;
  dateControl:Date;
  note?:string;
  documents?:DocumentModel[];
  priorityId:number;
  priority:Priority;
  employeeId:number;
  employee:Employee;
  category:Category;
  categoryId:number;
  user:User;
}
