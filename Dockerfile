FROM node:14.19-alpine
WORKDIR /usr/app/planning-front-end
EXPOSE 4200
COPY ./ ./
RUN npm install
CMD ["npm", "start"]
