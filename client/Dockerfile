FROM node:12.13.0-alpine

RUN apk update && \
  apk add && \
  apk add git

WORKDIR /usr/app

RUN apk update && \
  apk add && \
  apk add git

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]