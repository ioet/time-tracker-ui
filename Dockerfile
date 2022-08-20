FROM node:14-alpine AS building_stage
WORKDIR /app
COPY . /app
RUN npm cache clean --force && npm install
EXPOSE 4200 9876
RUN source .stage.env && npm run build


FROM nginx:1.21 AS production_stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=building_stage /app/dist/time-tracker /usr/share/nginx/html
EXPOSE 80


FROM node:14-alpine AS building_prod
WORKDIR /app
COPY . /app
RUN npm cache clean --force && npm install
EXPOSE 4200 9876
RUN source .prod.env && npm run build


FROM nginx:1.21 AS production_prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=building_prod /app/dist/time-tracker /usr/share/nginx/html
EXPOSE 80