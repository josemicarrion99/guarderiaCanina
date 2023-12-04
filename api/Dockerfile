FROM node:18.16.0
WORKDIR /docker/code 
COPY package.json .
RUN npm install 
COPY . . 
EXPOSE 3001
CMD ["npm", "start"]
