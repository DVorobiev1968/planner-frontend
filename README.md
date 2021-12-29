# Install
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
