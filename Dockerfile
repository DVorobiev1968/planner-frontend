# 1. Создаем приложение Angular
FROM node:14.19 as builder
LABEL maintainer="DVorobiev1968@mail.ru"

WORKDIR /usr/app/planning-front-end
COPY package.json package-lock.json ./
ENV CI=1
RUN npm -v
RUN npm ci --force

COPY . .
RUN npm run build -- --prod --output-path=/dist

# 2. Развертываем приложение Angular на NGINX
FROM nginx:1.14.2

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN mkdir -p "/var/www/www.rdturbo.ru/html/planning-front-end"
COPY ./dist/planning-front-end/* /var/www/www.rdturbo.ru/html/planning-front-end

# копируем конфигурацию nginx
COPY nginx /etc/nginx
# просмотр что имеем:
RUN ls -laR /etc/nginx

EXPOSE 80
VOLUME ["/var/log/nginx"]

RUN echo www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin >> /etc/passwd
# USER www-data

ENTRYPOINT ["nginx", "-g", "daemon off;"]
