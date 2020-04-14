#!/bin/bash

echo 'export const AUTHORITY = "'$AUTHORITY'";' > src/environments/keys.ts
echo 'export const CLIENT = "'$CLIENT_ID'";' >> src/environments/keys.ts
echo 'export const SCOPES = ["'$SCOPES'"];' >> src/environments/keys.ts
