# Stage 1: Build
FROM node:20.18.0 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve
FROM node:20.18.0

# Set working directory for the app
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --production

# Expose the port Next.js runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
