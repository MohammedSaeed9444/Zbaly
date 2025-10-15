#!/bin/bash

# Install curl and Node.js
apt-get update
apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verify installations
node --version
npm --version

# Install dependencies for backend
cd backend
npm install

# Run database migrations
npx prisma generate
npx prisma migrate deploy

# Start the backend server
npm start &

# Install dependencies for frontend
cd ../frontend
npm install

# Build the frontend
npm run build

# Install and start a static file server
npm install -g serve
serve -s build -l 3000