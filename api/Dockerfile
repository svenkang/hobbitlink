FROM node:18.18-alpine3.18@sha256:c41b5bfd0ef6f2db8f50323ce5ffb39f4ad444b5e5796c819ba4b1b799fbfdc2
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./src ./src
EXPOSE ${API_PORT}
CMD [ "npm run start:dev" ]
ENTRYPOINT [ "sh", "-c" ]
