FROM node:lts-alpine3.23 AS ngbuild

LABEL maintainer="mostafa.osman.fathi@gmail.com"
LABEL desc="backend microservice container for express-url-shortener"

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

RUN npm run build --prod

FROM node:lts-alpine3.23

RUN npm install --global serve

WORKDIR /app

COPY --from=ngbuild /app/dist/Frontend/browser /app


EXPOSE 80

CMD ["serve", "-s", "/app" ,"-p", "80"]