FROM node:lts-alpine as BUILD_IMAGE

WORKDIR /build

COPY package*.json ./

RUN npm install -qy

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:alpine as production

ENV NODE_ENV=production

WORKDIR /usr/app

# copy from build image
COPY --from=BUILD_IMAGE /build/next.config.js ./
COPY --from=BUILD_IMAGE /build/package.json ./package.json
COPY --from=BUILD_IMAGE /build/node_modules ./node_modules
COPY --from=BUILD_IMAGE /build/.next ./.next
COPY --from=BUILD_IMAGE /build/public ./public

EXPOSE 3000
# This run the server at default port 3000
CMD ["npm", "run", "start"]