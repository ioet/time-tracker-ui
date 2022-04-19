#!/bin/bash

> src/environments/keys.ts
echo 'export const AUTHORITY = "'$AUTHORITY'";' >> src/environments/keys.ts
echo 'export const CLIENT_ID = "'$CLIENT_ID'";' >> src/environments/keys.ts
echo 'export const SCOPES = ["'$SCOPES'"];' >> src/environments/keys.ts
echo 'export const STACK_EXCHANGE_ID = "'$STACK_EXCHANGE_ID'";' >> src/environments/keys.ts
echo 'export const STACK_EXCHANGE_ACCESS_TOKEN = "'$STACK_EXCHANGE_ACCESS_TOKEN'";' >> src/environments/keys.ts
echo 'export const AZURE_APP_CONFIGURATION_CONNECTION_STRING = "'$AZURE_APP_CONFIGURATION_CONNECTION_STRING'";' >> src/environments/keys.ts
cat src/environments/keys.ts
