# Base image
FROM node:19

# Make folder to put our files in
RUN mkdir -p /app
RUN mkdir -p /app/server
# Set working directory so that all subsequent command runs in this folder
WORKDIR /app/server

# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install nodemon -g
# Copy our app
COPY . .

ENV PORT 8080

# Expose port to access server
EXPOSE $PORT
# Command to run our app
CMD [ "npm", "start"]

