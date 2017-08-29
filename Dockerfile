FROM node:8.3.0

WORKDIR /home/app

COPY . /home/app

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]
