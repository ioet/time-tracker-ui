# Time-Tracker-UI  v1.50.6

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Metrics

[![codecov](https://codecov.io/gh/ioet/time-tracker-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/ioet/time-tracker-ui)
<br/>Code Coverage Status

![CD process to deploy to App-Service service](https://github.com/ioet/time-tracker-ui/workflows/CD%20process%20to%20deploy%20to%20App-Service%20service/badge.svg)
<br/>CD Pipeline Status

## Prerequisites

In general, you will need to have installed in your machine the following:
- Git
- Visual Studio code(most common) or your favourite editor

### Node.js

We strongly recommend that you install it using Node Version Management [https://github.com/nvm-sh/nvm] (v12.16.1 LTS) due to some project will only work with a specific version and by using Node Version Management you can switch between versions.

### Angular CLI

Angular CLI is a Command Line Interface (CLI) to speed up your development with Angular.

Run `npm install -g @angular/cli` to install Angular CLI

### Docker

You can download it from here: https://www.docker.com/get-started/ you will find the perfect Docker version for you.

### Chocolatey

By installing this, you'll be able to use the commands to run your proyect.
You can do it by following the steps here https://chocolatey.org/install. Although the page tells you to use Powershell, you should be able to use any command line with admin permissions. Don't forget to select the "Individual button" before following the installation steps.

![image](https://user-images.githubusercontent.com/42116904/166069074-f76d9bd3-01b9-4c50-92e7-c7558d026783.png)

### Make

You will need to install Make for you to be easier setting your environment. 
In your command line with admin permissions run `choco install make`

## Install Node Modules

In project path, open your favourite command line and run `npm install` in order to be able to run the project locally.

## Development server

Yo have 2 ways to run this project in dev mode:
**First**:
- In your project path, open your favourite command line and run the follwing commands: `make build` then `make run` and finally `make log`. When the project is successfully compiled you can go to `http://localhost:4200/` in your browser. Remember you must have your Docker running.
**Second**:
- Run `ng serve` to run the app in dev mode. After executing this command, you can navigate to `http://localhost:4200/` to see the app working. This method is usefull when you want to run a specific branch using less time but not recommended when doing QA.

In any case, the app will automatically reload if you change anything in the source files.

# Prepare your environment

### Set environment variables
**1**. Create a file keys.ts in the path `src/enviroment` with the content pinned in our slack channel #time-tracker-developer:

```
export const AUTHORITY = 'XXX';
export const CLIENT_ID = 'XXX';
export const SCOPES = ['XXX'];
export const STACK_EXCHANGE_ID = 'XXX';
export const STACK_EXCHANGE_ACCESS_TOKEN = 'XXX';
export const AZURE_APP_CONFIGURATION_CONNECTION_STRING = 'XXX';
```
**2**. Create a second file `.keys.json` with the content pinned in the slack channel #time-tracker-developer:
```
{
    "authority": 'XXX',
    "client_id": 'XXX',
    "scopes": ["XXX"]
}
```
### Prepare your environment for vscode
Install the following extensions:

- `Live Share`.
- `GitLens`
- `Prettier - Code formatter`.
- Go to user settings (`settings.json`) and enable formatting on save: `"editor.formatOnSave": true`.

### Commit messages format
  Commit messages' format follows the [Conventional Commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification,
  and specifically we are relying on the [Angular commit specifications](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) to bump the [semantic version](https://semver.org/) and generate app change log.

  Below there are some common examples you can use for your commit messages:

  - **feat**: A new feature.
  - **fix**: A bug fix.
  - **perf**: A code change that improves performance.
  - **build**: Changes that affect the build system or external dependencies (example scopes: npm, ts configuration).
  - **ci**: Changes to our CI or CD configuration files and scripts (example scopes: Azure devops, github actions).
  - **docs**: Documentation only changes.
  - **refactor**: A code change that neither fixes a bug nor adds a feature.
  - **style**: Changes that do not affect the meaning of the code (typos, white-space, formatting, missing semi-colons, etc).
               It is important to mention that this key is not related to css styles.
  - **test**: Adding missing tests or correcting existing tests.

  ### Example
    fix: TT-48 implement semantic versioning

    Prefix to use in the space fix:
    `(fix: |feat: |perf: |build: |ci: |docs: |refactor: |style: |test: )`

| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

### Branch names format
For example if your task in Jira is **TT-48 implement semantic versioning** your branch name is:
```
   TT-48-implement-semantic-versioning
```

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm run test-headless` or `ng test --browsers ChromeHeadless` to execute the unit tests via "Headless Browser".

## Running mutation tests
Mutation tests have been enabled using stryker. You can run those tests locally, it takes ~4 hours to have the results. If you want to run them locally please install stryker locally:
```
npm install -g stryker-cli
```

Now, run stryker:
```
stryker run
```

Stryker is also executed on GitHub actions with the following cron expresion:

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploy the app on Azure

The app deployment is automatically executed after each pull request is merged in master. That's wht it is necessary that each pull request meets at least 80% of test coverage.

You can visit the app in the following link:

[Time-Tracker](https://time-tracker-ui.azurewebsites.net/)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Feature Toggles dictionary

Shared file with all the Feature Toggles we create, so we can have a history of them
[Feature Toggles dictionary](https://github.com/ioet/time-tracker-ui/wiki/Feature-Toggles-dictionary)

## More information about the project
[Starting in Time Tracker](https://github.com/ioet/time-tracker-ui/wiki/Time-tracker)
