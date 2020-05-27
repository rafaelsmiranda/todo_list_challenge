FROM node:latest

RUN mkdir -p /usr/code/backend

COPY . /usr/code

COPY package.json /usr/code/backend

WORKDIR /usr/code/backend

RUN npm install

EXPOSE 3001

CMD [ "yarn", "start" ]