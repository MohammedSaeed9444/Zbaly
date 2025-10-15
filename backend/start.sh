#!/bin/bash

set -e  # Exit on error

echo "Starting deployment process..."

# Install Node.js
echo "Installing Node.js..."
if ! command -v node &> /dev/null; then
    apt-get update && apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Print versions
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Set environment variables
export PORT=${PORT:-3000}
export NODE_ENV=${NODE_ENV:-production}
echo "Using port: $PORT"
echo "Node environment: $NODE_ENV"

# Verify DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL is not set"
    exit 1
fi
echo "Database URL is configured"

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build TypeScript
echo "Building TypeScript..."
npm run build

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start the server
echo "Starting server..."
exec node dist/index.js
echo "Starting server on port $PORT"
npm start