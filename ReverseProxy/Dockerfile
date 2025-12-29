FROM nginx:stable-alpine3.23
LABEL authors="MostafaOsman"
LABEL desc="Frontend microservice container for express-url-shortener web app"

#RUN mkdir -p /var/cache/nginx \
#    && chown -R nginx:nginx /var/cache/nginx

#COPY reverse-proxy.conf /etc/nginx/conf.d/

COPY nginx.conf /etc/nginx/nginx.conf

VOLUME ["/var/cache/nginx"]