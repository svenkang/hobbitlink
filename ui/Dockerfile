FROM node:16.13.0-alpine3.14@sha256:3bca55259ada636e5fee8f2836aba7fa01fed7afd0652e12773ad44af95868b9
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./public ./public
COPY ./pages ./pages
COPY ./styles ./styles
EXPOSE ${UI_PORT}
CMD [ "npm run dev" ]
ENTRYPOINT [ "sh", "-c" ]
