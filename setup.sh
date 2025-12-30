#!/bin/bash

echo "🏹 Estonian Archery Data Manager - Setup Script"
echo "================================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ first"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    echo "Please make sure you're in the project directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 To start the application, run:"
    echo "   npm start"
    echo ""
    echo "📖 Or read the README.md for more information"
else
    echo ""
    echo "❌ Failed to install dependencies"
    echo "Please check the error messages above"
    exit 1
fi
