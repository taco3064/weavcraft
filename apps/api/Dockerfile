FROM node:20.11.1-alpine3.19 AS builder

WORKDIR /build
COPY . .

RUN npm ci \
    && npx nx run api:build:production \
    && rm -rf node_modules \
    && npm ci


FROM node:20.10.0-alpine3.19
RUN apk update \
    && apk upgrade \
    && apk add tzdata

RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime
RUN echo "Asia/Taipei" >  /etc/timezone

WORKDIR /app

ENV HOST=0.0.0.0
ENV APP_API_PORT=8001

COPY --from=builder /build/dist/apps/api ./dist
COPY --from=builder /build/node_modules ./node_modules
# copy package.json files, last arg is destination
COPY [ "package.json", "./" ]

CMD [ "node", "dist/main.js" ]
