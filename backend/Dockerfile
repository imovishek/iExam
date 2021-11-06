FROM node:14
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN useradd -ms /bin/bash dockeruser
RUN chown -R dockeruser ./server/compiler/files
USER dockeruser

EXPOSE 8085

CMD [ "node", "index.js" ]

# sudo docker build -t emsb .
# sudo docker run --rm -p 8085:8085 -it emsb
