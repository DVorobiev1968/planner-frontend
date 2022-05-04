#!/bin/sh
# ng build --configuration production
mkdir -p "/var/www/testedo.rdturbo.ru/html/planning-front-end"
cp -r $PWD/dist/planning-front-end/* /var/www/testedo.rdturbo.ru/html/planning-front-end
