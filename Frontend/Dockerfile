FROM node:lts-alpine3.23 AS ngbuild

LABEL authors="MostafaOsman"
LABEL maintainer="mostafa.osman.fathi@gmail.com"
LABEL desc="Frontend microservice container for express-url-shortener web app"

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

COPY ./deploy_enviroment.ts /app/Frontend/src/environments/environment.ts

RUN npm run build --prod

FROM node:lts-alpine3.23

RUN npm install --global serve

WORKDIR /app

COPY --from=ngbuild /app/dist/Frontend/browser /app


EXPOSE 80

CMD ["serve", "-s", "/app" ,"-p", "80"]