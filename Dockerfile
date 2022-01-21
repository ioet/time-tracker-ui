FROM node:14

WORKDIR /time-tracker-ui

COPY . .
RUN npm cache clean --force && npm install
