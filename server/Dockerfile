FROM node:8-slim

# RUN apt-get update && apt-get install -y openssh-server

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# RUN apt-get update && apt-get -y install openssh-client

# Bundle app source
COPY . .

EXPOSE 9090
CMD ["npm","run","production"]