FROM node:12-alpine

WORKDIR /app

ENV PORT 5000
ENV PG_HOST db
EXPOSE $PORT

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node", "dist/server.js" ]
