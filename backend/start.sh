#!/bin/bash

# Install Node.js
apt-get update && apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Print versions
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Set default port if not provided
export PORT=${PORT:-3000}
echo "Using port: $PORT"

# Install dependencies
npm ci

# Build TypeScript
echo "Building TypeScript..."
npm run build

# Set up database URL
if [ -z "$DATABASE_URL" ]; then
  export DATABASE_URL="postgresql://postgres:mainline.proxy.rlwy.net:5432/railway"
  echo "Using default DATABASE_URL"
else
  echo "Using provided DATABASE_URL"
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
npx wait-port ${DATABASE_URL#*://} -t 60000

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
DATABASE_URL=$DATABASE_URL npx prisma migrate deploy

# Start the server
echo "Starting server on port $PORT"
npm start