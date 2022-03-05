# Install for Ubuntu
## Step 1 – Installing Node.js
NVM is a command line tool for installing and managing node.js on Linux system. So first we need to install nvm on our system. Login to system with user for which you need to install Node.js, then execute below command to install nvm:

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
After that, you can install any version of node on your system. You can also install multiple node versions on single system. Execute below commands to load environment and install latest node.js version:

source ~/.bashrc
nvm install node
The above command will display the version of node and npm installed on your system.
## Step 2 – Installing Angular CLI
After installing the node.js and npm on your system, use following commands to install Angular cli tool on your system.
### latest version
npm install -g @angular/cli
### previous version
npm install -g @angular/cli@8        #Angular 8
npm install -g @angular/cli@9        #Angular 9
npm install -g @angular/cli@10       #Angular 10

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
