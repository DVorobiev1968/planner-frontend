export interface DocumentModel{
  id:number;
  name:string;
  nameFile:string;
  file:File;
  date:Date;
  taskId:number;
  employeeId:number;
}
export class DocumentClass implements DocumentModel{
  id: number;
  date: Date;
  employeeId: number;
  file: File;
  name: string;
  nameFile: string;
  taskId: number;
  userId: number;

  constructor(id:number, employeeId: number, file: File, name: string, nameFile: string, taskId: number, userId:number) {
    this.id=id;
    this.employeeId = employeeId;
    this.file = file;
    this.name = name;
    this.nameFile = nameFile;
    this.taskId = taskId;
    this.date=new Date();
    this.userId=userId;
  }

}
