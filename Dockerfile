FROM node:14 AS development

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}

RUN useradd -ms /bin/bash ${USERNAME}

WORKDIR ${HOME}/time-tracker-ui
COPY . .
RUN rm -f .env
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}/time-tracker-ui

USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200
EXPOSE 9876
CMD npm run config && ${HOME}/time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck



FROM development as build
COPY .env .
RUN npm run config && npm run build



FROM nginx:1.21 AS production

ENV USERNAME app
RUN useradd -ms /bin/bash ${USERNAME}

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/timetracker/time-tracker-ui/dist/time-tracker /usr/share/nginx/html

RUN chown -R ${USERNAME}:${USERNAME} /var/cache/nginx && \
    chown -R ${USERNAME}:${USERNAME} /var/log/nginx && \
    chown -R ${USERNAME}:${USERNAME} /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R ${USERNAME}:${USERNAME} /var/run/nginx.pid

#USER ${USERNAME}

EXPOSE 80
