FROM node:12.13.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
