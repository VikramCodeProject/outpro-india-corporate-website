#!/usr/bin/env bash

# Test the Contact API
# Usage: bash scripts/test-api.sh

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Outpro.India Contact API Test Script     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"

# Check if backend is running
echo -e "${YELLOW}1️⃣  Checking if backend server is running...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000)

if [ "$response" = "200" ] || [ "$response" = "404" ]; then
    echo -e "${GREEN}✅ Backend server is running on port 5000${NC}\n"
else
    echo -e "${RED}❌ Backend server is not running!${NC}"
    echo -e "${YELLOW}Start it with: node server.js${NC}\n"
    exit 1
fi

# Test 1: Health check
echo -e "${YELLOW}2️⃣  Testing health check endpoint...${NC}"
health=$(curl -s http://localhost:5000/api/health)
echo -e "${GREEN}Response:${NC}"
echo -e "  $health\n"

# Test 2: Valid contact form submission
echo -e "${YELLOW}3️⃣  Testing valid contact form submission...${NC}"
echo -e "${BLUE}Request:${NC}"
echo '  POST /api/contact'
echo '  {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corporation",
    "service": "web-development",
    "message": "I need a new website for my business"
  }'
echo ""

response=$(curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corporation",
    "service": "web-development",
    "message": "I need a new website for my business"
  }')

echo -e "${GREEN}Response:${NC}"
echo "  $response"
echo ""

# Test 3: Missing required field
echo -e "${YELLOW}4️⃣  Testing with missing required field (should fail)...${NC}"
echo -e "${BLUE}Request:${NC}"
echo '  POST /api/contact (missing "message" field)'
echo ""

response=$(curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "company": "Test Corp",
    "service": "mobile-apps"
  }')

echo -e "${GREEN}Response:${NC}"
echo "  $response"
echo ""

# Test 4: Invalid email
echo -e "${YELLOW}5️⃣  Testing with invalid email (should fail)...${NC}"
echo -e "${BLUE}Request:${NC}"
echo '  POST /api/contact (invalid email format)'
echo ""

response=$(curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Smith",
    "email": "not-an-email",
    "company": "Test Corp",
    "service": "ui-ux-design",
    "message": "Great design work!"
  }')

echo -e "${GREEN}Response:${NC}"
echo "  $response"
echo ""

# Test 5: XSS attempt (should be sanitized)
echo -e "${YELLOW}6️⃣  Testing XSS prevention (should be sanitized)...${NC}"
echo -e "${BLUE}Request:${NC}"
echo '  POST /api/contact (with HTML tags - should be removed)'
echo ""

response=$(curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice <script>alert(1)</script>",
    "email": "alice@example.com",
    "company": "Test <b>Corp</b>",
    "service": "cloud-solutions",
    "message": "Check <a>this</a>"
  }')

echo -e "${GREEN}Response:${NC}"
echo "  $response"
echo ""

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  API Testing Complete                      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}✅ All tests completed!${NC}"
echo -e "${YELLOW}Check your email (hello@outpro.india) for contact submissions.${NC}\n"
