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
FROM nginx:alpine

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN mkdir -p "/var/www/testedo.rdturbo.ru/html/planning-front-end"
COPY $PWD/dist/planning-front-end/* /var/www/testedo.rdturbo.ru/html/planning-front-end

# копируем конфигурацию nginx
COPY $PWD/nginx/ /etc/nginx/
RUN ln -s /etc/nginx/sites-available/testedo.rdturbo.ru /etc/nginx/sites-enabled/testedo.rdturbo.ru

EXPOSE 80
VOLUME ["/var/log/nginx"]

ENTRYPOINT ["nginx", "-g", "daemon off;"]
