FROM node:20.11.1-alpine3.19 AS builder

WORKDIR /build
COPY apps/api apps/api
COPY libs libs
COPY packages packages
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY nx.json nx.json
COPY project.json project.json
COPY tsconfig.base.json tsconfig.base.json

RUN npm ci --ignore-scripts \
    && npx nx run api:build:production \
    && npm prune --production \
    && npm cache clean --force


FROM node:20.11.1-alpine3.19
RUN apk update \
    && apk upgrade \
    && apk --no-cache add tzdata

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
