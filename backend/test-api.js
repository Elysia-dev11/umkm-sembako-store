const http = require('http');

const API_BASE = 'http://localhost:7860';
const tests = [];

function makeRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(`${API_BASE}${endpoint}`, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : body;
          resolve({
            status: res.statusCode,
            data: parsed,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body,
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting API Tests for UMKM Sembako Store Backend\n');

  // Test 1: Health Check
  console.log('1. Testing /health endpoint...');
  try {
    const health = await makeRequest('GET', '/health');
    tests.push({
      name: 'Health Check',
      passed: health.status === 200,
      status: health.status,
    });
    console.log(`   ✅ Status: ${health.status}, Data:`, health.data);
  } catch (error) {
    tests.push({
      name: 'Health Check',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Get Products
  console.log('\n2. Testing GET /api/products...');
  try {
    const products = await makeRequest('GET', '/api/products');
    tests.push({
      name: 'Get Products',
      passed: products.status === 200 && products.data.success,
      status: products.status,
    });
    console.log(`   ✅ Status: ${products.status}, Count: ${products.data.data?.length || 0} products`);
  } catch (error) {
    tests.push({
      name: 'Get Products',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: Get Single Product
  console.log('\n3. Testing GET /api/products/1...');
  try {
    const product = await makeRequest('GET', '/api/products/1');
    tests.push({
      name: 'Get Single Product',
      passed: product.status === 200 && product.data.success,
      status: product.status,
    });
    console.log(`   ✅ Status: ${product.status}, Product: ${product.data.data?.name || 'N/A'}`);
  } catch (error) {
    tests.push({
      name: 'Get Single Product',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 4: Get Categories
  console.log('\n4. Testing GET /api/categories...');
  try {
    const categories = await makeRequest('GET', '/api/categories');
    tests.push({
      name: 'Get Categories',
      passed: categories.status === 200 && categories.data.success,
      status: categories.status,
    });
    console.log(`   ✅ Status: ${categories.status}, Count: ${categories.data.data?.length || 0} categories`);
  } catch (error) {
    tests.push({
      name: 'Get Categories',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 5: User Registration
  console.log('\n5. Testing POST /api/auth/register...');
  try {
    const registerData = {
      email: `test${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test User',
    };
    
    const register = await makeRequest('POST', '/api/auth/register', registerData);
    tests.push({
      name: 'User Registration',
      passed: register.status === 201 && register.data.success,
      status: register.status,
    });
    console.log(`   ✅ Status: ${register.status}, Message: ${register.data.message}`);
  } catch (error) {
    tests.push({
      name: 'User Registration',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 6: User Login
  console.log('\n6. Testing POST /api/auth/login...');
  try {
    const loginData = {
      email: 'customer@example.com',
      password: 'customer123',
    };
    
    const login = await makeRequest('POST', '/api/auth/login', loginData);
    tests.push({
      name: 'User Login',
      passed: login.status === 200 && login.data.success,
      status: login.status,
    });
    if (login.data.success) {
      console.log(`   ✅ Status: ${login.status}, Token received: ${login.data.data.token ? 'Yes' : 'No'}`);
    } else {
      console.log(`   ❌ Login failed: ${login.data.error}`);
    }
  } catch (error) {
    tests.push({
      name: 'User Login',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 7: Get Cart
  console.log('\n7. Testing GET /api/cart...');
  try {
    const cart = await makeRequest('GET', '/api/cart');
    tests.push({
      name: 'Get Cart',
      passed: cart.status === 200 && cart.data.success,
      status: cart.status,
    });
    console.log(`   ✅ Status: ${cart.status}, Items in cart: ${cart.data.data?.totalItems || 0}`);
  } catch (error) {
    tests.push({
      name: 'Get Cart',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 8: Get Orders
  console.log('\n8. Testing GET /api/orders...');
  try {
    const orders = await makeRequest('GET', '/api/orders');
    tests.push({
      name: 'Get Orders',
      passed: orders.status === 200 && orders.data.success,
      status: orders.status,
    });
    console.log(`   ✅ Status: ${orders.status}, Orders count: ${orders.data.data?.length || 0}`);
  } catch (error) {
    tests.push({
      name: 'Get Orders',
      passed: false,
      error: error.message,
    });
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Summary
  console.log('\n📊 TEST SUMMARY:');
  console.log('='.repeat(50));
  
  const passed = tests.filter(t => t.passed).length;
  const total = tests.length;
  
  tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name}: ${test.passed ? '✅ PASS' : '❌ FAIL'}`);
    if (!test.passed && test.error) {
      console.log(`   Error: ${test.error}`);
    }
  });
  
  console.log('='.repeat(50));
  console.log(`🎯 Total: ${passed}/${total} tests passed (${Math.round((passed/total)*100)}%)`);
  
  if (passed === total) {
    console.log('\n🎉 ALL TESTS PASSED! Backend is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Check the logs above.');
  }
}

// Run tests
runTests().catch(console.error);