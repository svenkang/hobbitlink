FROM node:18.18.0-alpine3.18@sha256:a0b787b0d53feacfa6d606fb555e0dbfebab30573277f1fe25148b05b66fa097
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./src ./src
EXPOSE ${API_PORT}
CMD [ "npm run start:dev" ]
ENTRYPOINT [ "sh", "-c" ]
