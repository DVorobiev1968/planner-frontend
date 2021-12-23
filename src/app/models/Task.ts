import {Category} from "./Category";
import {Employee} from "./Employee";
import {Priority} from "./Priority";
import {DocumentModel} from "./DocumentModel";
import {User} from "./User";

export interface Task{
  id:number;
  title:string;
  completed:number;
  date:Date;
  note:string;
  documents:DocumentModel[];
  priority:Priority;
  employee:Employee;
  category:Category;
  user:User;
}
