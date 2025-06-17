FROM node:24-alpine

WORKDIR /app

COPY package*.json /app/
COPY src /app/src/
COPY public /app/public/

WORKDIR /app

RUN npm install

CMD ["npm", "start"]
