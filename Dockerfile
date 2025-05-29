FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"]