FROM node:16.17.0-alpine3.16@sha256:bf1e1c4761cd5e417b5ed60d5c599266270b728878089efcd1d63a8bd1dde446
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./src ./src
EXPOSE ${API_PORT}
CMD [ "npm run start:dev" ]
ENTRYPOINT [ "sh", "-c" ]
