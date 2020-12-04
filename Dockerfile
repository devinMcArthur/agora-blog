# Build the client
FROM node:12.13.0-alpine

WORKDIR /usr/app/app/
COPY app/package*.json ./
RUN yarn install --only=prod
COPY app/ ./
RUN npm run build

# Setup the server
WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy --only=prod
COPY server/ ./

ENV PORT 8080
EXPOSE 8080

CMD ["npm", "start"]