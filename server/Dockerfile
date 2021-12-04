FROM node:16.13.0-alpine3.14@sha256:3bca55259ada636e5fee8f2836aba7fa01fed7afd0652e12773ad44af95868b9 AS builder
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
RUN npm run build:nest

FROM node:16.13.0-alpine3.14@sha256:3bca55259ada636e5fee8f2836aba7fa01fed7afd0652e12773ad44af95868b9
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install --production --no-optional --ignore-scripts
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD [ "npm run start:prod" ]
ENTRYPOINT [ "sh", "-c" ]