import {IUser,User} from "./User";

export interface IRouteTask{
  id:number;
  startId:number;
  startUserFIO: string
  destinationId:number;
  destinationUserFIO:string;
  taskId:number;
  taskTitle:string;
  taskReference:string;
  date:Date;
  state:number;
  stateMessage:string;
  note:string;
}

export enum ERouteTask{
    PROCESS,
    SEND_AGREEMENT,
    SEND_EMAIL,
    REJECT,
    AGREEMENT,
    TERMINATE,
    CANCELED
}

export class RouteTask implements IRouteTask{
  id:number;
  startId:number;
  startUserFIO: string
  destinationId:number;
  destinationUserFIO:string;
  taskId:number;
  taskTitle:string;
  taskReference:string;
  date:Date;
  state:number;
  stateMessage:string;
  note:string;

  constructor(destinationId: number, note: string, startId: number,taskId: number) {
    this.date =new Date();
    this.destinationId = destinationId;
    this.destinationUserFIO="";
    this.note = note;
    this.startId = startId;
    this.startUserFIO="";
    this.state = ERouteTask.PROCESS;
    this.taskId=taskId;
    this.taskTitle="";
    this.taskReference="";
    this.taskId = taskId;
    this.stateMessage="";
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
