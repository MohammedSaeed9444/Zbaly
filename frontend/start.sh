#!/bin/bash

# Install Node.js
apt-get update
apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install dependencies
npm install

# Build the React app
npm run build

# Install and start static server
npm install -g serve
serve -s build -l $PORT