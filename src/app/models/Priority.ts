export interface IPriority {
  id:number;
  title:string;
  color:string;
  countDay:number;
}
export class Priority implements IPriority{
  id: number;
  title: string;
  color: string;
  countDay: number;

  constructor(priority:IPriority) {
    this.id = priority.id;
    this.title = priority.title;
    this.color = priority.color;
    this.countDay = priority.countDay;
  }
}
