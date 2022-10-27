import { EnvironmentType } from './enum';

export const environment = {
  production: EnvironmentType.TT_PROD_LEGACY,
  timeTrackerApiUrl: process.env["API_URL"],
  stackexchangeApiUrl: 'https://api.stackexchange.com',
  authUrl: process.env['AUTH_URL'],
  authAppName: process.env['AUTH_APP_NAME']
};

export const AUTHORITY = process.env["AUTHORITY"];
export const CLIENT_ID = process.env["CLIENT_ID"];
export const CLIENT_URL = process.env["CLIENT_URL"].replace(/[\n\r]/g, '');
export const SCOPES = process.env["SCOPES"].split(",");
export const ITEMS_PER_PAGE = 5;
export const STACK_EXCHANGE_ID = process.env["STACK_EXCHANGE_ID"];
export const STACK_EXCHANGE_ACCESS_TOKEN = process.env["STACK_EXCHANGE_ACCESS_TOKEN"];
export const AZURE_APP_CONFIGURATION_CONNECTION_STRING = process.env["AZURE_APP_CONFIGURATION_CONNECTION_STRING"];
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
