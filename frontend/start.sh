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

# Set default port if not provided
export PORT=${PORT:-3000}
echo "Using port: $PORT"

# Set API URL for the frontend
export REACT_APP_API_URL=${REACT_APP_API_URL:-"https://zbaly-production.up.railway.app"}
echo "Using API URL: $REACT_APP_API_URL"

# Clean install dependencies
echo "Installing dependencies..."
npm ci --production

# Build the React app
echo "Building React app..."
CI=false GENERATE_SOURCEMAP=false npm run build

# Install serve
echo "Installing serve..."
npm install -g serve

# Start the server
echo "Starting server on port $PORT..."
exec serve -s build -l $PORT