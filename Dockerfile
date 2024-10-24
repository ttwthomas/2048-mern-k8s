FROM node:23-slim
COPY . /usr/src/app
RUN cp -r /usr/src/app/client/public /usr/src/app/client/build
WORKDIR /usr/src/app/server
RUN npm install
EXPOSE 5000
CMD ["npm","run", "start"]
