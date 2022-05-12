FROM node:14

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}
RUN useradd -ms /bin/bash ${USERNAME}

WORKDIR ${HOME}/time-tracker-ui
COPY . .
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}/time-tracker-ui \
    && chmod -R 777 ${HOME}/time-tracker-ui

USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200
CMD npm run config && ${HOME}/time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck
