export enum ERole{
  ROLE_USER,
  ROLE_LEVEL_1,
  ROLE_LEVEL_2,
  ROLE_LEVEL_3,
  ROLE_ADMIN,
  ROLE_DEV
}
export interface IRole{
  id:number;
  title:string;
  active:boolean;
}
export class Role{
  roles:IRole[];

  constructor() {
    this.roles=[
      {id:0,title:"Пользователь",active:true},
      {id:1,title:"Руководитель уровня 1",active:false},
      {id:2,title:"Руководитель уровня 2",active:false},
      {id:3,title:"Руководитель уровня 3",active:false},
      {id:4,title:"Администратор",active:false},
      {id:5,title:"Разработчик",active:false}
    ]
  }
}
