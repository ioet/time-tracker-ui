const { writeFile } = require('fs');

const pathJs = `./src/environments/keys.ts`
const contentKeys =
`export const AUTHORITY = '${process.env["AUTHORITY"]}';
export const CLIENT_ID = '${process.env["CLIENT_ID"]}';
export const SCOPES = ['${process.env["SCOPES"]}'];
export const STACK_EXCHANGE_ID = '${process.env["STACK_EXCHANGE_ID"]}';
export const STACK_EXCHANGE_ACCESS_TOKEN = '${process.env["STACK_EXCHANGE_ACCESS_TOKEN"]}';
export const AZURE_APP_CONFIGURATION_CONNECTION_STRING = '${process.env["AZURE_APP_CONFIGURATION_CONNECTION_STRING"]}';
`;

writeFile(pathJs, contentKeys, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${pathJs}`);
});

const pathJson = `./src/environments/.keys.json`
const contentKeysJson =
`{
    "authority": "${process.env.AUTHORITY_JSON}",
    "client_id": "${process.env.CLIENT_ID_JSON}",
    "scopes": ["${process.env.SCOPES_JSON}"]
}`;

writeFile(pathJson, contentKeysJson, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${pathJson}`);
});
