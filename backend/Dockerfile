# backend/Dockerfile
FROM node:22

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn remove bcrypt
RUN yarn add bcrypt --force --build-from-source
RUN yarn build

EXPOSE 9000
CMD ["node", "dist/main"]