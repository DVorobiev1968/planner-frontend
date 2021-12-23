import {Category} from "./Category";
import {Employee} from "./Employee";
import {Prority} from "./Prority";
import {DocumentModel} from "./DocumentModel";
import {User} from "./User";

export interface Task{
  id:number;
  title:string;
  completed:number;
  date:Date;
  note:string;
  documents:DocumentModel[];
  priority:Prority;
  employee:Employee;
  category:Category;
  user:User;
}
