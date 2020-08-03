FROM node:12-alpine

WORKDIR /app

ENV PORT 5000
EXPOSE $PORT

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV PG_HOST db
ENV NODE_ENV production

CMD [ "node", "dist/server.js" ]
