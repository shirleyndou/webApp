FROM node:10.20.1
WORKDIR /app
CMD ls -ltr && npm install && npm start