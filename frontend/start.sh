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

# Build the React app
CI=false npm run build

# Serve the built app
echo "Starting server on port $PORT"
npx serve -s build -l $PORT