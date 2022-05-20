#!/bin/sh
mkdir -p "/var/www/testedo.rdturbo.ru/html/planning-front-end"
npm run build -- --configuration production --output-path=/var/www/testedo.rdturbo.ru/html/planning-front-end
