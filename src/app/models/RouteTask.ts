import {User,UserClass} from "./User";

export interface IRouteTask{
  id:number;
  startId:number;
  destinationId:number;
  taskId:number;
  date:Date;
  state:number;
  note:string;
}

export enum ERouteTask{
  PROCESS,
  SEND_AGREEMENT,
  SEND_EMAIL,
  REJECT,
  AGREEMENT
}

export class RouteTask implements IRouteTask{
  date: Date;
  destinationUser: UserClass;
  destinationId: number;
  id: number;
  note: string;
  startUser: UserClass;
  startId: number;
  state: number;
  taskName: string;
  taskId: number;

  constructor(destinationId: number, note: string, startId: number,taskId: number) {
    this.date =new Date();
    this.destinationUser=new UserClass(0, "", "", "", "", "", "")
    this.destinationId = destinationId;
    this.note = note;
    this.startUser=new UserClass(0, "", "", "", "", "", "")
    this.startId = startId;
    this.state = ERouteTask.PROCESS;
    this.taskName="";
    this.taskId = taskId;
  }
  getTaskName():string{
    return this.taskName;
  }
  setTaskName(val:string):void{
    this.taskName=val;
  }
}
export interface IState{
  id:number;
  title:string;
}

export class State implements IState{
  id:number;
  title:string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
