// This file can be replaced during build by using the 'fileReplacements' array.
// 'ng build --prod' replaces 'environment.ts' with 'environment.prod.ts'.
// The list of file replacements can be found in 'angular.json'.
import { EnvironmentType } from './enum';

/* tslint:disable:no-string-literal */
export const environment = {
  production: EnvironmentType.TT_DEV,
  timeTrackerApiUrl: process.env['API_URL'],
  stackexchangeApiUrl: 'https://api.stackexchange.com',
  authUrl: process.env['AUTH_URL'],
  authAppName: process.env['AUTH_APP_NAME'],
};

export const AUTHORITY = process.env['AUTHORITY'];
export const CLIENT_ID = process.env['CLIENT_ID'];
export const CLIENT_URL = process.env['CLIENT_URL'];
export const AUTH_URL = process.env['AUTH_URL'];
export const SCOPES = process.env['SCOPES'].split(',');
export const STACK_EXCHANGE_ID = process.env['STACK_EXCHANGE_ID'];
export const STACK_EXCHANGE_ACCESS_TOKEN = process.env['STACK_EXCHANGE_ACCESS_TOKEN'];
export const AZURE_APP_CONFIGURATION_CONNECTION_STRING = process.env['AZURE_APP_CONFIGURATION_CONNECTION_STRING'];
/* tslint:enable:no-string-literal */
export const ITEMS_PER_PAGE = 5;

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_FORMAT_YEAR = 'YYYY-MM-DD';
export const GROUPS = {
  ADMIN: 'time-tracker-admin',
  TESTER: 'time-tracker-tester',
};

export const ROLES = {
  admin: {
    name: 'admin',
    value: 'time-tracker-admin',
  },
  tester: {
    name: 'test',
    value: 'time-tracker-tester',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as 'zone.run', 'zoneDelegate.invokeTask'.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
