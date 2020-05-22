FROM node:alpine

# fix bug with cra
ENV CI=true 

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]