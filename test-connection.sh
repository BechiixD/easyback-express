#!/bin/bash

echo "🧪 Testing EasyBack Express Server Connection..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if server is running
echo -e "\n1. Testing server connectivity..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health | grep -q "200"; then
    echo -e "${GREEN}✅ Server is running on port 3001${NC}"
else
    echo -e "${RED}❌ Server not responding on port 3001${NC}"
    echo -e "${YELLOW}💡 Please run: npm run server${NC}"
    exit 1
fi

# Test 2: Test health endpoint
echo -e "\n2. Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:3001/api/health)
if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Health endpoint working${NC}"
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Health endpoint failed${NC}"
fi

# Test 3: Test CORS
echo -e "\n3. Testing CORS with OPTIONS request..."
CORS_RESPONSE=$(curl -s -X OPTIONS -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: Content-Type" -w "%{http_code}" http://localhost:3001/api/generate)
if echo "$CORS_RESPONSE" | grep -q "200"; then
    echo -e "${GREEN}✅ CORS is properly configured${NC}"
else
    echo -e "${RED}❌ CORS may have issues${NC}"
    echo "Response: $CORS_RESPONSE"
fi

# Test 4: Test generate endpoint with sample data
echo -e "\n4. Testing generate endpoint..."
GENERATE_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:5173" \
    -d '{
        "endpoints": [
            {
                "id": "test-1",
                "path": "/api/test",
                "method": "GET",
                "description": "Test endpoint",
                "headers": [
                    {"id": "h1", "key": "X-Test-Header", "value": "test-value"}
                ]
            }
        ]
    }' \
    http://localhost:3001/api/generate)

if echo "$GENERATE_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Generate endpoint working${NC}"
    echo "Files will be available at: http://localhost:3001/downloads/generated/"
else
    echo -e "${RED}❌ Generate endpoint failed${NC}"
    echo "Response: $GENERATE_RESPONSE"
fi

echo -e "\n🎉 Test completed!"
echo -e "\nIf all tests passed, your server is ready."
echo -e "If any tests failed, check the error messages above."
echo -e "\nTo start both frontend and backend: ${YELLOW}npm run dev${NC}"
