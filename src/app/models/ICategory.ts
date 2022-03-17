export interface ICategory {
  id?:number;
  title:string;
}
export class Category implements ICategory{
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
