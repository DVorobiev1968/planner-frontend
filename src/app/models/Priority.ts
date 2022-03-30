import {IState, State} from "./RouteTask";

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
export class TypePriority{
  id:number;
  title:string;
  value:string;


  constructor(id: number, title: string, value:string) {
    this.id = id;
    this.title = title;
    this.value=value;
  }
}

export class TypesPriority {
  typesPriority: Array<TypePriority>;

  constructor() {
    this.typesPriority = [
      {"id": 0, "title": "Голубой", "value":"table-info"},
      {"id": 1, "title": "Оранжевый", "value":"table-warning"},
      {"id": 2, "title": "Красный", "value":"table-danger"},
      {"id": 3, "title": "Зеленый", "value":"table-success"},
      {"id": 4, "title": "Серый", "value":"table-light"},
    ];
  }
}
