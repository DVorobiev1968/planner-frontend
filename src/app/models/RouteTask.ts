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
  destinationId: number;
  id: number;
  note: string;
  startId: number;
  state: number;
  taskId: number;

  constructor(destinationId: number, note: string, startId: number,taskId: number) {
    this.date =new Date();
    this.destinationId = destinationId;
    this.note = note;
    this.startId = startId;
    this.state = ERouteTask.PROCESS;
    this.taskId = taskId;
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
