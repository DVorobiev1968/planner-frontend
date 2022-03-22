export class Conf{
  AUTH_API:string;
  CATEGORY_API:string;
  UPLOAD_API:string;
  EMPLOYEE_API:string;
  PRIORITY_API:string;
  ROUTE_TASK_API:string;
  TASK_API:string;
  TOKEN_KEY:string;
  USER_KEY:string;
  USER_API:string;
  HOST:string;
  TESTING: string;

  constructor() {
    // this.HOST='http://planning-back-end:8090';
    this.HOST='http://localhost:8090';
    // this.HOST='http://testedo.rdturbo.ru:8090';
    this.TESTING=this.HOST+'/api/auth/test';
    this.AUTH_API=this.HOST+'/api/auth/';
    this.CATEGORY_API=this.HOST+'/api/category/';
    this.UPLOAD_API=this.HOST+'/api/docs/';
    this.EMPLOYEE_API = this.HOST+'/api/employee/';
    this.PRIORITY_API = this.HOST+'/api/priority/';
    this.ROUTE_TASK_API = this.HOST+'/api/route/';
    this.TASK_API = this.HOST+'/api/task/';
    this.TOKEN_KEY = 'auth-token';
    this.USER_KEY = 'auth-user';
    this.USER_API = this.HOST+'/api/user/';

  }
}
