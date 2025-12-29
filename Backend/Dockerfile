FROM node:lts-alpine3.23

LABEL authors="MostafaOsman"
LABEL maintainer="mostafa.osman.fathi@gmail.com"
LABEL desc="Backend microservice container for express-url-shortener web app"

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

EXPOSE 3333

CMD ["node", "index.js"]
