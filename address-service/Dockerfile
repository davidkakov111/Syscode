FROM node:22-bullseye

# Install Liquibase
RUN apt-get update && \
    apt-get install -y wget openjdk-11-jdk && \
    wget https://github.com/liquibase/liquibase/releases/download/v4.16.0/liquibase-4.16.0.tar.gz && \
    tar -xzf liquibase-4.16.0.tar.gz && \
    mv liquibase /usr/local/bin

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