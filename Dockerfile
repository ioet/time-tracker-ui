FROM node:14 AS development

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}

RUN useradd -ms /bin/bash ${USERNAME}

WORKDIR ${HOME}/time-tracker-ui
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}
COPY --chown=${USERNAME}:${USERNAME} . .

USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200
EXPOSE 9876
CMD npm run config && ${HOME}/time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck



FROM node:14 AS production

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}

RUN useradd -m -d ${HOME} -s /bin/bash ${USERNAME}

WORKDIR ${HOME}/time-tracker-ui
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}
COPY --chown=${USERNAME}:${USERNAME} . .

USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200
CMD npm run config && /time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck --prod