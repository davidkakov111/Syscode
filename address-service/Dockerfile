FROM node:22-bullseye

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port Node.js will run on
EXPOSE 3001

# Start the app
CMD ["node", "src/app.js"]

# To remove containers, volumes, etc., run the following command:
# sudo docker compose down --volumes --rmi all
