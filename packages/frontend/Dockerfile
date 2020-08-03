FROM node:12-alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:12-alpine

WORKDIR /

ENV PORT 3333
EXPOSE $PORT

RUN mkdir /app
COPY --from=builder /app/build /app

RUN yarn global add serve

CMD [ "serve", "-s", "app", "-l", "3333" ]
