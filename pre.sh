#!/bin/bash
echo "Starting npm install and build process..."

npm install
if [ $? -ne 0 ]; then
  echo "npm install failed"
  exit 1
fi

npm run build
if [ $? -ne 0 ]; then
  echo "npm build failed"
  exit 1
fi

echo "npm install and build completed successfully!"