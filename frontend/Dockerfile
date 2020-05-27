FROM node:latest

RUN mkdir -p /usr/code/frontend

COPY . /usr/code

COPY package.json /usr/code/frontend

WORKDIR /usr/code/frontend

RUN npm install

EXPOSE 8081

CMD [ "yarn", "start" ]