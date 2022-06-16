FROM node:14 AS development

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}
RUN useradd -ms /bin/bash ${USERNAME}
WORKDIR ${HOME}/time-tracker-ui
COPY . .
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}/time-tracker-ui
RUN chmod -R 777 ${HOME}/time-tracker-ui

USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200
EXPOSE 9876
CMD ${HOME}/time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck



FROM development as build
ENV SCOPES ${{ secrets.SCOPES }}
ENV API_URL ${{ secrets.API_URL_STAGE }}
ENV CLIENT_ID ${{ secrets.CLIENT_ID_STAGE }}
ENV CLIENT_URL ${{ secrets.CLIENT_URL_STAGE }}
ENV AUTHORITY ${{ secrets.AUTHORITY }}
ENV STACK_EXCHANGE_ID ${{ secrets.STACK_EXCHANGE_ID }}
ENV STACK_EXCHANGE_ACCESS_TOKEN ${{ secrets.STACK_EXCHANGE_ACCESS_TOKEN }}
ENV AZURE_APP_CONFIGURATION_CONNECTION_STRING ${{ secrets.AZURE_APP_CONFIGURATION_CONNECTION_STRING }}
RUN chmod +x ./scripts/populate-keys.sh
RUN sh ./scripts/populate-keys.sh
RUN npm run build

FROM nginx:1.21 AS production

ENV USERNAME app
RUN useradd -ms /bin/bash ${USERNAME}

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/timetracker/time-tracker-ui/dist/time-tracker /usr/share/nginx/html
# COPY .env /usr/share/nginx/html
RUN chown -R ${USERNAME}:${USERNAME} /var/cache/nginx && \
    chown -R ${USERNAME}:${USERNAME} /var/log/nginx && \
    chown -R ${USERNAME}:${USERNAME} /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R ${USERNAME}:${USERNAME} /var/run/nginx.pid

# FIXME: Actually if we can deploy to azure in port 80 we need a root user
# Maybe we can refactor this dockerfile to use root user directly this is not a good approach y
# security terms. It's a good practice to have rootless in containers so for this
# we can to refactor this dockerfile and the terraform module to deploy in other ports because
# Ports below 1024 needs root permisions.

# USER ${USERNAME}

EXPOSE 80