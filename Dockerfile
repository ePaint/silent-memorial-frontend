# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . /app/
ENV NODE_ENV production
RUN npm run build

# Stage 1, based on NGINX to provide a configuration to be used with react-router
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

# CMD [ "npx", "serve", "build" ]