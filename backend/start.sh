#!/bin/bash

# Install Node.js
apt-get update
apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install dependencies
npm install

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate deploy

# Start the backend server
npm start