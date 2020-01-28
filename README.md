### Project Description ###

This is an example of project based on Cypress.
The project contains tests for web-service:

UI tests for web-site https://www.lieferando.de. Sign in and simple order creation scenarios is implemented.
It uses data from the fixture file.

## 1. Prerequisites
Before running test you should install NodeJS at you environment:
https://nodejs.org/en/download/

## 2. Running of auto-tests locally

In order to run testing script at your own machine perform the following instructions:

#### 2.1 Load the project from the GitHub
Project URL: https://github.com/cronnoss/lieferando-e2e.git

For example, you may load the project using the command line:
```
git clone https://github.com/cronnoss/lieferando-e2e.git
```

#### 2.2 Install components
As soon as project is loaded, go to the root and perform command:
```
yarn install
```
It will install all components based on package.json file into node_modules folder.

#### 2.3 As soon as components are loaded you may run testing scripts. 
*You must have a free private account on the site https://www.lieferando.de.*

*Type your email and password in the file: cypress/fixtures/users/default.json*


```
yarn test
```

##### 2.3.1 Run all tests

*If you are not interested in seeing GUI while tests execution you may run tests in Electron*
https://www.npmjs.com/package/electron.

To run all tests in Electron:
```
npx cypress run
```
*If you prefer to see the application GUI while tests execution you may run tests in Chrome.*

To run all tests in Chrome:
```
npx cypress run -b chrome
```

##### 2.3.2 Run single test file
Cypress provides the Test Runner that allows you to run testing files separately and see 
the execution process:  https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview

To open it use the following command:
```
yarn test
```
In the Test Runner you will see the list of testing files. You may click any of them and execution 
tests within a single it would be started in a separate window. Pay attention that results recording 
is not performed if you use the Test Runner. So, this option is mostly for 
development and issues investigation. For running all the scope you should better use other options.
