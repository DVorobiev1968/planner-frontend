# Install for Ubuntu
## Step 1 – Установка Node с помощью Node Version Manager
Еще одним способом установки Node.js, который является достаточно гибким, является использование nvm, или Node Version Manager. Это программное обеспечение позволяет устанавливать и поддерживать несколько разных независимых версий Node.js и связанных с ними пакетов Node.

Чтобы установить NVM на ваш сервер Ubuntu 20.04, откройте страницу проекта на GitHub. Скопируйте команду curl из файла README, отображаемого на главной странице. Она позволит получить самую последнюю версию скрипта установки.

Прежде чем передавать команду в bash, рекомендуется проверить скрипт, чтобы убедиться, что он не делает ничего, с чем вы не согласны. Вы можете сделать это, удалив сегмент | bash в конце команды curl:
<pre>
git clone https://github.com/nvm-sh/nvm.git .nvm
cd ~/.nvm and check out the latest version with git checkout v0.39.1
# Активируем команду nvm:
activate nvm by sourcing it from your shell: . ./nvm.sh
# Активируем переменные окружения
source ~/.bashrc
# Если нужно последнюю версию, то: 
nvm install node
# Для данного проекта:
nvm install 14.18.1
# Просмотр доступных версий
nvm list-remote
# Просмотр установленных версий
nvm list
# ИНсталируем lts/fermium
nvm install lts/fermium
# Переключиться между установленными версиями
nvm use версия
</pre>

## Step 2 – Installing Angular CLI
После установки node.js и npm в вашей системе используйте следующие команды для установки инструмента Angular cli в вашей системе.

### latest version
npm install -g @angular/cli
### previous version
npm install -g @angular/cli@8        #Angular 8
npm install -g @angular/cli@9        #Angular 9
npm install -g @angular/cli@10       #Angular 10
### текущий проект
npm install -g @angular/cli@13.1.2
### Возможные проблемы:
<p> При запуске job npm-build: Возможно сообщение об ошибке, оно может быть связано 
с тем что не удалось собрать собрать проект из-за отсутствия необходимых зависимостей, а не только пути к npm. Поэтому пробуем запустить вручную:
как прописано в скрипте. После чего читаем журналы и сообщения об ошибках. 
<ol> Возможные решения:
<li> Инсталяция недостающих зависимостей.
<p>Перейти в домашнюю директорию проекта, поскольку зависимости должны располагаться внутри проекта, затем выполнить установку.</p>
<pre>
#Проверить версию Angular
ng version
# Предварительно произведем обновление модулей
npm update
# в случае выявления уязвимостей:
npm audit fix
npm install --save-dev @angular-devkit/build-angular
# в случае если при сборке выйдет ошибка типа:
# SyntaxError: The requested module '@angular/compiler' does not provide an export named 'isSyntaxError'
# то обновляем Angular
ng update
# почистить кэш
npm cache clean --force
</pre>
</li>

</ol>


# Install for Windows
Instruction <https://ccbill.com/kb/install-angular-on-windows>
## Step 1: Install Node.js
Angular bases its build environments on Node.js, and many of its features depend on NMP packages. Conveniently, the Node Package Manager (NPM) client is part of the default Node.js package.

To install Node.js:

1. Visit the official Node.js page <https://nodejs.org/en/download/> and download the latest Node.js Windows Installer.
2. Access the Windows Command Prompt (or PowerShell) and check the Node.js version:

node -v

To verify the NPM version, use the following command:

npm -v

## Step 2: Install TypeScript (Optional)
TypeScript makes JavaScript easier to maintain and understand. You can install TypeScript as an NPM package. The installation is optional, as it is not a prerequisite for developing an Angular application.

1.. Access the Windows Command Prompt and install TypeScript with the following command:

npm install -g typescript

2. Once the installation is complete, verify the TypeScript version:

tsc -v
for poxy:
create $HOME_USER\.npmrc:
http-proxy=http://user:pass@proxy.company.com:8080
https-proxy=https://user:pass@proxy.company.com:8080
registry=http://registry.npmjs.org/
strict-ssl=false

## Step 3: Install Angular CLI
The Angular command-line interface (CLI) tool allows you to initialize, develop, and manage your Angular applications. You can use the NPM package manager to install the Angular CLI.

1. Access the Windows Command Prompt and enter the following command:

npm install -g @angular/cli
Once all packages have been added, verify the installed version:

ng --version

# PlanningFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## update Node js
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

<h1>Развертывание приложения</h1>
<p></p>
<ol>Архитектура развертывания предусматривает, что приложения:
<li>создаем виртуальную машину с именем хоста: testedo.rdturbo.ru. Как вариант WSL2
(/etc/hosts:192.168.0.7: testedo.rdturdo.ru: )</li>
<li>mysql: устанавливается отдельно чтобы не изменять БД, при обновлении релизов. 
Как вариант оставить его Windows, но пробросить клиента на внешний адрес: 192.168.0.7 (hosts:192.168.0.7: testedo.rdturdo.ru: )</li>
<li>back-end</li>
<li>front-end</li></ol>
<p>Упаковываются как docker image. Для этого необходимо выполнить следующие действия:</p>
<h2>Настройка проекта:</h2>
<h3>package.json</h3>
<pre>
  "name": "planning-front-end",
  "version": "0.0.0",
  "scripts": {
  ...
  "start": "ng serve --proxy-config proxy.conf.json --host testedo.rdturbo.ru",
  ...
  },
</pre>
<h3>proxy.conf.json</h3>
<pre>
  "/api/*":
  {
    "target": "http://testedo.rdturbo:8090",
    "secure": false,
    "logLevel": "warn",
    "changeOrigin": true,
    "pathRewrite": {
      "^/": ""
    }
  }
</pre>
<h3>Conf.ts</h3>
<pre>
....
    this.HOST='http://testedo.rdturbo.ru:8090';
....
</pre>
<h3> Формирование Dockerfile</h3>
<pre>
# syntax=docker/dockerfile:1
FROM node:14.19
ENV NODE_ENV=production
WORKDIR /usr/app/planning-front-end
EXPOSE 4200
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["npm", "start"]
</pre>
<h3>Сборка и запись образа:</h3>
<pre>
docker build -t dvorobiev1968/planning-front-end .
docker push dvorobiev1968/planning-front-end
</pre>
<h3>Запуск контейнера:</h3>
<pre>
docker run dvorobiev1968/planning-front-end
</pre>
<h2>Сборка проекта и развертывание на nginx</h2>
<p>С целью оптимизации рабочего пространства а также сохранения авторских прав, данное Angular -приложение,
может быть собрано и скомпилировано в коды js.
</p>
<h3>Сборка проекта:</h3>
<p>Введим в проект конфигурацию для проксирования в enviroment.prod.ts</p>
<pre>
export const environment = {
  production: {
    "budgets": [
      {
        "type": "initial",
        "maximumWarning": "2.4mb",
        "maximumError": "5mb"
      },
      {
        "type": "anyComponentStyle",
        "maximumWarning": "2kb",
        "maximumError": "4kb"
      }
    ],
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    "outputHashing": "all",
    "proxyConfig": "proxy.conf.product.json"
  },
.......
</pre>
<p>Введим в проект конфигурацию для проксирования в proxy.conf.production.json</p>
<pre>
{
  "/api/*":
  {
    "target": "http://testedo.rdturbo.ru:8090",
    "secure": false,
    "logLevel": "info",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
</pre>
<p> Прописываем точку входа в проект в package.json</p>
<pre>
  "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json --host testedo.rdturbo.ru",
    "build": "ng build --configuration=production --base-href /planning-front-end/ --deploy-url /planning-front-end/",
</pre>
<p>Сборка проекта</p>
<pre>

> planning-front-end@0.0.0 build
> ng build --configuration=production --base-href /

✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.

Initial Chunk Files           | Names         | Raw Size | Estimated Transfer Size
main.98e94c8256a0f935.js      | main          |  2.40 MB |               443.79 kB
styles.c1debaf5875a12bf.css   | styles        | 72.76 kB |                 7.60 kB
polyfills.5700ed2d22374eda.js | polyfills     | 36.22 kB |                11.53 kB
runtime.a6501f7bf2f23103.js   | runtime       |  1.16 kB |               641 bytes

                              | Initial Total |  2.51 MB |               463.55 kB

Build at: 2022-05-11T06:11:31.148Z - Hash: 63859f8c9d4af727 - Time: 12261ms

Warning: /home/user/IdeaProjects/planning-front-end/src/app/task/list-task/list-task.component.ts depends on 'xlsx'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: bundle initial exceeded maximum budget. Budget 2.40 MB was not met by 109.15 kB with a total of 2.51 MB.
</pre>
<p>После чего в папке по умолчанию собирается весь проект:</p>
<pre>
ser@user:~/IdeaProjects/planning-front-end$ ls -laR dist
dist:
итого 12
drwxrwxr-x  3 user user 4096 May 11 06:11 .
drwxrwxr-x 10 user user 4096 May  4 10:39 ..
drwxrwxr-x  2 user user 4096 May 11 06:11 planning-front-end

dist/planning-front-end:
итого 2632
drwxrwxr-x 2 user user    4096 May 11 06:11 .
drwxrwxr-x 3 user user    4096 May 11 06:11 ..
-rw-rw-r-- 1 user user   28758 May 11 06:11 3rdpartylicenses.txt
-rw-rw-r-- 1 user user     948 May 11 06:11 favicon.ico
-rw-rw-r-- 1 user user    7242 May 11 06:11 index.html
-rw-rw-r-- 1 user user 2515578 May 11 06:11 main.98e94c8256a0f935.js
-rw-rw-r-- 1 user user   37088 May 11 06:11 polyfills.5700ed2d22374eda.js
-rw-rw-r-- 1 user user    1183 May 11 06:11 runtime.a6501f7bf2f23103.js
-rw-rw-r-- 1 user user   74503 May 11 06:11 styles.c1debaf5875a12bf.css
</pre>
<p>Копируем содержимое в папку с html-документами nginx</p>
<pre>
ser@user:~/IdeaProjects/planning-front-end$ cat deployToNginx.sh 
#!/bin/sh
mkdir -p "/var/www/testedo.rdturbo.ru/html/planning-front-end"
cp -r $PWD/dist/planning-front-end/* /var/www/testedo.rdturbo.ru/html/planning-front-end
</pre>
<p>Настраиваем сервер nginx. Подробнее о настройке можно почитать тут:(https://serveradmin.ru/nginx-proxy_pass/)  testedo.rdturbo.ru</p>
<pre>
server {
        server_name testedo.rdturbo.ru www.testedo.rdturbo.ru;
        listen 80;
        listen [::]:80;
        index index.html index.htm;

	location / {
        	root /var/www/testedo.rdturbo.ru/html/planning-front-end;
	}

	location /api/ {
		client_max_body_size 32M;

        	if ($request_method = 'OPTIONS') {
	            add_header 'Access-Control-Allow-Origin' '*' always;
        	    add_header 'Access-Cotnrol-Allow-Credentials' 'true';
	            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        	    add_header 'Access-Control-Allow-Headers' 'Origin,Content-Type,Accept,Authorization,If-Modified-Since,Pragma';
	            add_header 'Access-Control-Max-Age' 1728000;
        	    add_header 'Content-Type' 'text/plain charset=UTF-8';
	            add_header 'Content-Length' 0;
        	    return 204;
	        }

        	if ($request_method = 'POST') {
                	add_header 'Access-Control-Allow-Origin' '*' always;
	                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        	        add_header 'Access-Control-Allow-Headers' 'Origin,Referer,DNT,User-Agent,X-Requested-With,If-Modified-Since,Content-Type,Range';
                	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
	        }

	
        	if ($request_method = 'GET') {
	               	add_header 'Access-Control-Allow-Origin' '*' always;
        	        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                	add_header 'Access-Control-Allow-Headers' 'Origin,Referer,DNT,User-Agent,X-Requested-With,If-Modified-Since,Content-Type,Range';
	                add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        	}
		
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://testedo.rdturbo.ru:8090/api/;
		proxy_read_timeout 120s;
	}

}
</pre>
<p>После чего перезапускаем nginx</p>
<pre>
ser@user:~/IdeaProjects/planning-front-end$ sudo systemctl restart nginx
[sudo] пароль для user: 
user@user:~/IdeaProjects/planning-front-end$ sudo systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2022-05-11 06:23:40 UTC; 8s ago
       Docs: man:nginx(8)
    Process: 220693 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 220712 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 220714 (nginx)
      Tasks: 5 (limit: 6951)
     Memory: 6.2M
     CGroup: /system.slice/nginx.service
             ├─220714 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
             ├─220715 nginx: worker process
             ├─220716 nginx: worker process
             ├─220717 nginx: worker process
             └─220718 nginx: worker process

May 11 06:23:40 user systemd[1]: Starting A high performance web server and a reverse proxy server...
May 11 06:23:40 user systemd[1]: Started A high performance web server and a reverse proxy server.
</pre>
<p>Проверяем через браузер http://testedo.rdturbo.ru</p>
<h2>Сборка с использованием технологии docker</h2>
<p>Dockerfile:</p>
<pre>
# 1. Создаем приложение Angular
FROM node:14.19 as builder
LABEL maintainer="DVorobiev1968@mail.ru"

WORKDIR /usr/app/planning-front-end
COPY package.json package-lock.json ./
ENV CI=1
RUN npm -v
RUN npm ci --force

COPY . .
RUN npm run build -- --prod --output-path=/dist

# 2. Развертываем приложение Angular на NGINX
FROM nginx:alpine

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN mkdir -p "/var/www/testedo.rdturbo.ru/html/planning-front-end"
COPY ./dist/planning-front-end/* /var/www/testedo.rdturbo.ru/html/planning-front-end

# копируем конфигурацию nginx
COPY nginx /etc/nginx
RUN ln -sf /etc/nginx/sites-available/testedo.rdturbo.ru /etc/nginx/sites-enabled/testedo.rdturbo.ru
# просмотр что имеем:
RUN ls -laR /etc/nginx

EXPOSE 80
VOLUME ["/var/log/nginx"]

RUN echo www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin >> /etc/passwd
# USER www-data

ENTRYPOINT ["nginx", "-g", "daemon off;"]
</pre>
<p>docker-compose.yml:</p>
<pre>
version: '3.7'

networks:
app-network:
driver: bridge

services:
planning-front-end:
image: dvorobiev1968/planning-front-end:latest
container_name: planning-front-end
build:
context: ./
dockerfile: ./Dockerfile
networks:
app-network:
ports:
- 8081:80
volumes:
- /var/log/nginx:/var/log
</pre>
<p>Создаем docker-образ</p>
<pre>
$ docker build -t dvorobiev1968/planning-front-end .
</pre>
<p>Создание и запуск контенера</p>
<pre>
$docker-compose up -d
</pre>
<p>Проверка запуска</p>
<pre>
user@user:~/IdeaProjects/planning-front-end$ docker ps
CONTAINER ID   IMAGE                                     COMMAND                  CREATED             STATUS         PORTS                                       NAMES
fbadd67c4d34   dvorobiev1968/planning-front-end:latest   "nginx -g 'daemon of…"   About an hour ago   Up 4 seconds   0.0.0.0:8081->80/tcp, :::8081->80/tcp       planning-front-end
cb0c393dde93   dvorobiev1968/planning-back-end:latest    "./mvnw spring-boot:…"   12 days ago         Up 7 days      0.0.0.0:8090->8090/tcp, :::8090->8090/tcp   planning-back-end
</pre>
<h2>Сопровождение frontend</h2>
<p>Поскольку frontend находится в отладочном режиме целесообразно предусмотреть процедуру его быстрог деплоя на nginx.
С этой целью реализован соответствующий скрипт deployToNginx.sh где производится сборка проекта в каталоге: /var/www/testedo.rdturbo.ru/html/planning-front-end
</p>
<pre>
user@user:~/IdeaProjects/planning-front-end$ git pull
user@user:~/IdeaProjects/planning-front-end$ ./deployToNginx.sh 
> planning-front-end@0.0.0 build
> ng build --configuration=production --base-href /  "--configuration" "production" "--output-path=/var/www/testedo.rdturbo.ru/html/planning-front-end"

✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.

Initial Chunk Files           | Names         | Raw Size | Estimated Transfer Size
main.99685dcb58de58a6.js      | main          |  2.40 MB |               444.18 kB
styles.c1debaf5875a12bf.css   | styles        | 72.76 kB |                 7.60 kB
polyfills.5700ed2d22374eda.js | polyfills     | 36.22 kB |                11.53 kB
runtime.a6501f7bf2f23103.js   | runtime       |  1.16 kB |               641 bytes

                              | Initial Total |  2.51 MB |               463.94 kB

Build at: 2022-05-20T06:56:38.738Z - Hash: 68e25b37309e3b5c - Time: 27977ms

Warning: /home/user/IdeaProjects/planning-front-end/src/app/task/list-task/list-task.component.ts depends on 'xlsx'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: bundle initial exceeded maximum budget. Budget 2.40 MB was not met by 109.27 kB with a total of 2.51 MB.
</pre>



