#!/bin/sh
mkdir -p "/var/www/www.pc26.ru/planning-front-end"
npm run build -- --configuration production --output-path=/var/www/www.pc26.ru/planning-front-end
