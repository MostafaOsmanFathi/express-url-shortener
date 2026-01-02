FROM node:lts-alpine3.23 AS ngbuild

LABEL authors="MostafaOsman"
LABEL maintainer="mostafa.osman.fathi@gmail.com"
LABEL desc="Frontend microservice container for express-url-shortener web app"
LABEL org.opencontainers.image.source="https://github.com/MostafaOsmanFathi/express-url-shortener"
LABEL org.opencontainers.image.title="Express URL Shortener"
LABEL org.opencontainers.image.description="Backend service for shortening URLs with MongoDB and reverse proxy"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

RUN cp /app/deploy_enviroment.ts /app/src/environments/environment.ts

RUN npm run build --prod

FROM node:lts-alpine3.23

RUN npm install --global serve

WORKDIR /app

COPY --from=ngbuild /app/dist/Frontend/browser /app


EXPOSE 5000

CMD ["serve", "-s", "/app" ,"-p", "5000"]