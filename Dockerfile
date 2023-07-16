# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the desired port (default is 3000 for Next.js)
EXPOSE 3000

# Set the command to run the Next.js server
CMD ["npm", "run", "start"]
