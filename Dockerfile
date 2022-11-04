# Get node from Docker DockerHub
FROM node:12-alpine

# Install Nodemon
RUN npm i -g nodemon

# Make fampay-assignment directory as work directory
RUN mkdir /fampay-assignment

WORKDIR /fampay-assignment

# Copy package files and install in work directory
COPY package.json /fampay-assignment

COPY package-lock.json /fampay-assignment

RUN npm i

COPY . /fampay-assignment

# Expose port 5000
EXPOSE 5000

# Run command
CMD [ "npm", "start" ]