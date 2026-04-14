#!/bin/bash
# MedWorx - Quick Start Script
# This script installs dependencies and starts the dev server

set -e

echo "================================================"
echo "  MedWorx - The Capital of Medical Businesses"
echo "================================================"
echo ""

cd "$(dirname "$0")/frontend"

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies (first run)..."
    npm install
    echo ""
fi

echo "Starting MedWorx in demo mode (no database needed)..."
echo ""
echo "  Public site:  http://localhost:3000"
echo "  Admin panel:  http://localhost:3000/admin/login"
echo "  Admin login:  admin@medworx.iq / changeme123"
echo ""
echo "Press Ctrl+C to stop the server."
echo "================================================"
echo ""

npm run dev
