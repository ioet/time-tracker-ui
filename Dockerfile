FROM node:14

WORKDIR /time-tracker-ui

COPY package*.json .
RUN npm cache clean --force && npm install
COPY . .
