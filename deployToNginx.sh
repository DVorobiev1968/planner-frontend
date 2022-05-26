#!/bin/sh
mkdir -p "/var/www/www.rdturbo.ru/html/planning-front-end"
npm run build -- --configuration production --output-path=/var/www/www.rdturbo.ru/html/planning-front-end
