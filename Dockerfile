FROM node:14 AS development

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}

RUN useradd -ms /bin/bash ${USERNAME}

WORKDIR ${HOME}/time-tracker-ui
COPY [^.env]* . .
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}

USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200
EXPOSE 9876
CMD npm run config && ${HOME}/time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck



FROM node:14 AS build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build



FROM nginx:1.21 AS production

ENV USERNAME nginx

COPY nginx.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/time-tracker /usr/share/nginx/html

RUN chown -R ${USERNAME}:${USERNAME} /var/cache/nginx && \
    chown -R ${USERNAME}:${USERNAME} /var/log/nginx && \
    chown -R ${USERNAME}:${USERNAME} /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R ${USERNAME}:${USERNAME} /var/run/nginx.pid

USER ${USERNAME}

EXPOSE 4200