# Step 1: Use the official Node.js image
FROM node:20

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy application files
COPY . .

# Step 5: Expose port 3000
EXPOSE 3000

# Step 6: Start the application
CMD ["node", "index.js"]
