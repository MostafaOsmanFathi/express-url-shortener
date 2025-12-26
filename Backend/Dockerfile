FROM node:lts-alpine3.23

LABEL maintainer="mostafa.osman.fathi@gmail.com"
LABEL desc="backend microservice container for express-url-shortener"

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

EXPOSE 3333

CMD ["node", "index.js"]
