FROM node:lts-alpine as BUILD_IMAGE

WORKDIR /app

COPY package*.json ./

RUN npm install -qy

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:alpine

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public

EXPOSE 3000
# This run the server at default port 3000
CMD ["npm", "run", "start"]