import {DateService} from "../service/date.service";

export interface IDocumentModel {
  id: number;
  name: string;
  nameFile: string;
  file: File;
  date: Date;
  taskId: number;
  employeeId: number;
  note: string;
  disabled:boolean;
}

export class DocumentModel implements IDocumentModel {
  id: number;
  date: Date;
  employeeId: number;
  file: File;
  name: string;
  nameFile: string;
  taskId: number;
  userId: number;
  note: string;
  disabled: boolean;

  constructor(value:IDocumentModel) {
    this.id=value.id;
    this.file=value.file;
    this.name=value.name;
    this.nameFile=value.nameFile;
    this.note=value.note;
    this.employeeId=value.employeeId;
    this.taskId=value.taskId;
    value.date==undefined ? new Date(): value.date;
    this.disabled=false;
  }
}
