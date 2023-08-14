# Use the official Node.js 14 image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the containers
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Node.js app listens on
EXPOSE 3000

# Start the index.js app
CMD ["node", "index.js"]
