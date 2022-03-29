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
    this.TESTING='/api/auth/test';
    this.AUTH_API='/api/auth/';
    this.CATEGORY_API='/api/category/';
    this.UPLOAD_API='/api/docs/';
    this.EMPLOYEE_API ='/api/employee/';
    this.PRIORITY_API ='/api/priority/';
    this.ROUTE_TASK_API ='/api/route/';
    this.TASK_API ='/api/task/';
    this.TOKEN_KEY = 'auth-token';
    this.USER_KEY = 'auth-user';
    this.USER_API ='/api/user/';

  }
}
