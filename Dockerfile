FROM node:14 AS development

ENV USERNAME timetracker
ENV HOME /home/${USERNAME}
ENV CHROME_BIN /opt/google/chrome/google-chrome
#Essential tools and xvfb
RUN apt-get update && apt-get install -y \
    software-properties-common \
    unzip \
    curl \
    wget \
    xvfb

#Chrome browser to run the tests
ARG CHROME_VERSION=65.0.3325.181
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add \
      && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
      && dpkg -i google-chrome-stable_current_amd64.deb || true
RUN apt-get install -y -f \
      && rm -rf /var/lib/apt/lists/*

#Disable the SUID sandbox so that chrome can launch without being in a privileged container
RUN dpkg-divert --add --rename --divert /opt/google/chrome/google-chrome.real /opt/google/chrome/google-chrome \
        && echo "#! /bin/bash\nexec /opt/google/chrome/google-chrome.real --no-sandbox --disable-setuid-sandbox \"\$@\"" > /opt/google/chrome/google-chrome \
        && chmod 755 /opt/google/chrome/google-chrome

#Chrome Driver
ARG CHROME_DRIVER_VERSION=2.37
RUN mkdir -p /opt/selenium \
        && curl http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip -o /opt/selenium/chromedriver_linux64.zip \
        && cd /opt/selenium; unzip /opt/selenium/chromedriver_linux64.zip; rm -rf chromedriver_linux64.zip; ln -fs /opt/selenium/chromedriver /usr/local/bin/chromedriver;

RUN useradd -ms /bin/bash ${USERNAME}

WORKDIR ${HOME}/time-tracker-ui
COPY . .
RUN rm -f .env
RUN chown ${USERNAME}:${USERNAME} -R ${HOME}/time-tracker-ui
RUN chmod -R 777 ${HOME}/time-tracker-ui



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
