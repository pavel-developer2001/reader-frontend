FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]
