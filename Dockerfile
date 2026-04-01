# syntax=docker/dockerfile:1

# Build stage
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and config first for better layer caching
COPY package*.json vite.config.* tailwind.config.* postcss.config.mjs ./

# Install dependencies
RUN npm install

# Copy source code for building
COPY src ./src
COPY index.html ./

# Build the application
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built artifacts
COPY --from=builder /usr/src/app/dist ./dist

# Copy production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy static files
COPY --from=builder /usr/src/app/index.html ./

# Set ownership
RUN chown -R nodejs:nodejs /usr/src/app

# Switch to non-root user
USER nodejs

# Expose Vite port
EXPOSE 5173

# Start frontend with production preview
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
