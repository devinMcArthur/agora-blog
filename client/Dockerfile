# Build the client
FROM node:lts-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN yarn install --only=prod

COPY . .

RUN npm run build