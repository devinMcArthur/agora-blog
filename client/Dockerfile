# Build the client
FROM node:12.13.0-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN yarn install --only=prod

COPY . .

RUN npm run build