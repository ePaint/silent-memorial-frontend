FROM buildpack-deps:bullseye

ENV NODE_VERSION 18.15.0

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]