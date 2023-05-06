FROM node:18.16.0-alpine3.17@sha256:44aaf1ccc80eaed6572a0f2ef7d6b5a2982d54481e4255480041ac92221e2f11
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./src ./src
EXPOSE ${API_PORT}
CMD [ "npm run start:dev" ]
ENTRYPOINT [ "sh", "-c" ]
