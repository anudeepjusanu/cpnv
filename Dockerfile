FROM node:10

WORKDIR /app

ADD package.json /app
ADD internals/ /app
RUN npm install --silent
COPY . /app
EXPOSE 3009
RUN npm run build
ENTRYPOINT npm run start:prod