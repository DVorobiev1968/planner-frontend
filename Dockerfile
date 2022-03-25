# syntax=docker/dockerfile:1
FROM node:14.19
ENV NODE_ENV=production
WORKDIR /usr/app/planning-front-end
EXPOSE 4200
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["npm", "start"]
