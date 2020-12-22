# Build the client
FROM node:12.13.0-alpine

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN yarn install --only=prod
COPY client/ ./
RUN npm run build

# Setup the apii
WORKDIR /usr/app/api/
COPY api/package*.json ./
RUN npm install -qy --only=prod
COPY api/ ./
RUN npm run build

ENV PORT 8080
EXPOSE 8080

CMD ["npm", "start"]