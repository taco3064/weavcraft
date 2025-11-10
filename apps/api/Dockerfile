FROM node:22.12.0-alpine3.21 AS builder

WORKDIR /build
COPY apps/api apps/api
COPY libs libs
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY nx.json nx.json
COPY tsconfig.base.json tsconfig.base.json
COPY jest.config.ts jest.config.ts
COPY jest.preset.js jest.preset.js
COPY .eslintrc.json .eslintrc.json
COPY .eslintignore .eslintignore
COPY .nvmrc .nvmrc
COPY .prettierrc .prettierrc

RUN npm install --ignore-scripts \
    && npx nx run api:build:production \
    && rm -rf node_modules \
    && npm ci --ignore-scripts \
    && npm prune --production \
    && npm cache clean --force


FROM node:22.12.0-alpine3.21

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN apk update \
    && apk upgrade \
    && apk --no-cache add tzdata

RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime
RUN echo "Asia/Taipei" >  /etc/timezone

WORKDIR /app

ENV HOST=0.0.0.0
ENV APP_API_PORT=8001

RUN mkdir -p /app/logs
RUN chown nonroot:nonroot -R /app

USER nonroot


COPY --from=builder /build/dist/apps/api ./dist
COPY --from=builder /build/node_modules ./node_modules
# copy package.json files, last arg is destination
COPY [ "package.json", "./" ]

CMD [ "node", "dist/main.js" ]
