FROM node:alpine

WORKDIR /frontend

EXPOSE 3000

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]
