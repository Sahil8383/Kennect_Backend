# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm cache clean --force
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm rebuild bcrypt --build-from-source
# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]
