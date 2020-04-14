#!/bin/bash

> src/environments/keys.ts
echo 'export const AUTHORITY = "'$AUTHORITY'";' >> src/environments/keys.ts
echo 'export const CLIENT_ID = "'$CLIENT_ID'";' >> src/environments/keys.ts
echo 'export const SCOPES = ["'$SCOPES'"];' >> src/environments/keys.ts
cat src/environments/keys.ts
