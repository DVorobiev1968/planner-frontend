# syntax=docker/dockerfile:1
FROM node:14.19
ENV NODE_ENV=production
WORKDIR /usr/app/planning-front-end
EXPOSE 4200
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
RUN npm install -g @angular/cli
RUN ng -v
COPY . .
#CMD ["ng", "serve", "--proxy-config proxy.conf.product.json", "--host planning-front-end"," --disable-host-check"]
CMD ["npm","start"]
