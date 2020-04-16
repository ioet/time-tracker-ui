// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as keys from './keys';

export const environment = {
  production: false,
  timeTrackerApiUrl: 'https://tsheets-apim.azure-api.net',
  stackexchangeApiUrl: 'https://api.stackexchange.com',
};

export const AUTHORITY = keys.AUTHORITY;
export const CLIENT_ID = keys.CLIENT_ID;
export const SCOPES = keys.SCOPES;
export const ITEMS_PER_PAGE = 5;
export const STACK_EXCHANGE_ID = keys.STACK_EXCHANGE_ID;
export const STACK_EXCHANGE_ACCESS_TOKEN = keys.STACK_EXCHANGE_ACCESS_TOKEN;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
