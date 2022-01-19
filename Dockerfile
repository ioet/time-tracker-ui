# choose base image to build off of
FROM node:14

# set the current working directory for all commands
WORKDIR /time-tracker-ui

# copy these over first and run 'npm install' so the node_modules will be cached
# until the package.json / lock changes
COPY package*.json .
RUN npm cache clean --force && npm install

# copy over all code files
COPY . .

# expose internal docker container port to external environment
EXPOSE 4200

# specify default command to run when we run the image
CMD /time-tracker-ui/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck
