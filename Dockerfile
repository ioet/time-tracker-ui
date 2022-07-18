FROM node:14-alpine AS building
WORKDIR /app
# ENV USERNAME timetracker
# ENV HOME /home/${USERNAME}
# RUN useradd -ms /bin/bash ${USERNAME}
# WORKDIR ${HOME}/time-tracker-ui
COPY . /app
# RUN chown ${USERNAME}:${USERNAME} -R ${HOME}/time-tracker-ui
# RUN chmod -R 777 ${HOME}/time-tracker-ui
# USER ${USERNAME}
RUN npm cache clean --force && npm install
EXPOSE 4200 9876
RUN source .stage.env && npm run build
# >> scrt && 
#

FROM nginx:1.21 AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=building /app/dist/time-tracker /usr/share/nginx/html
# FIXME: Actually if we can deploy to azure in port 80 we need a root user
# Maybe we can refactor this dockerfile to use root user directly this is not a good approach y
# security terms. It's a good practice to have rootless in containers so for this
# we can to refactor this dockerfile and the terraform module to deploy in other ports because
# Ports below 1024 needs root permisions.

# USER ${USERNAME}

EXPOSE 80