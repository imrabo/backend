# Stage 1: Build stage
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Stage 2: Runtime stage (Minimal Image)
FROM node:20-alpine

WORKDIR /app

# Copy built files & dependencies from build stage
COPY --from=build /app /app

# Expose the port Express listens on
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]
