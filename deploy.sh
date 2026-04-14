#!/bin/bash
set -e

echo "========================================="
echo "  MedWorx Deployment Script"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check prerequisites
check_prereq() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}✗ $1 is not installed${NC}"
        return 1
    fi
    echo -e "${GREEN}✓ $1 found${NC}"
    return 0
}

echo "Checking prerequisites..."
check_prereq "node"
check_prereq "npm"
check_prereq "aws"
check_prereq "npx"
echo ""

# ============== STEP 1: Backend (CDK) ==============
echo -e "${YELLOW}Step 1: Deploy AWS Infrastructure (CDK)${NC}"
echo "This will create: VPC, DocumentDB, S3, CloudFront"
echo ""
read -p "Deploy CDK stack? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd backend
    echo "Installing backend dependencies..."
    npm install

    echo "Bootstrapping CDK (first time only)..."
    npx cdk bootstrap 2>/dev/null || true

    echo "Deploying CDK stack..."
    npx cdk deploy --require-approval broadening --outputs-file cdk-outputs.json

    echo -e "${GREEN}✓ CDK stack deployed!${NC}"

    # Extract outputs
    if [ -f cdk-outputs.json ]; then
        echo ""
        echo "Stack outputs:"
        cat cdk-outputs.json | python3 -m json.tool 2>/dev/null || cat cdk-outputs.json
    fi

    cd ..
fi

echo ""

# ============== STEP 2: Frontend Setup ==============
echo -e "${YELLOW}Step 2: Setup Frontend${NC}"
echo ""

cd frontend

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local from template..."
    cp .env.example .env.local
    echo -e "${YELLOW}⚠ Please edit frontend/.env.local with your actual values:${NC}"
    echo "  - MONGODB_URI (from DocumentDB endpoint or MongoDB Atlas)"
    echo "  - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "  - AWS credentials (from CDK outputs)"
    echo ""
    read -p "Press Enter after editing .env.local..."
fi

echo "Installing frontend dependencies..."
npm install

# ============== STEP 3: Seed Database ==============
echo ""
echo -e "${YELLOW}Step 3: Seed Database${NC}"
read -p "Seed the database with sample data? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Running database seed..."
    npx ts-node --compiler-options '{"module":"commonjs"}' src/lib/seed.ts
    echo -e "${GREEN}✓ Database seeded!${NC}"
fi

# ============== STEP 4: Build & Start ==============
echo ""
echo -e "${YELLOW}Step 4: Build Frontend${NC}"

echo "Building Next.js application..."
npm run build

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "To start the production server:"
echo "  cd frontend && npm start"
echo ""
echo "To start in development mode:"
echo "  cd frontend && npm run dev"
echo ""
echo "Admin panel: http://localhost:3000/admin"
echo "  Email: admin@medworx.iq"
echo "  Password: changeme123"
echo ""
echo -e "${YELLOW}For production hosting, consider:${NC}"
echo "  - Vercel (recommended for Next.js)"
echo "  - AWS Amplify"
echo "  - Docker + ECS/EKS"
echo ""