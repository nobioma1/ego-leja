## production
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --only=prod --silent

COPY . .

CMD ["npm", "start"]