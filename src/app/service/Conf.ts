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

  constructor() {
    this.AUTH_API='http://planning-back-end:8090/api/auth/';
    this.CATEGORY_API='http://planning-back-end:8090/api/category/';
    this.UPLOAD_API='http://planning-back-end:8090/api/docs/';
    this.EMPLOYEE_API = 'http://planning-back-end:8090/api/employee/';
    this.PRIORITY_API = 'http://planning-back-end:8090/api/priority/';
    this.ROUTE_TASK_API = 'http://planning-back-end:8090/api/route/';
    this.TASK_API = 'http://planning-back-end:8090/api/task/';
    this.TOKEN_KEY = 'auth-token';
    this.USER_KEY = 'auth-user';
    this.USER_API = 'http://planning-back-end:8090/api/user/';

  }
}
