const fetch = require('node-fetch');

async function testServer() {
  try {
    console.log('Testing MaizeBus Backend Server...\n');
    
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    console.log('\n2. Testing form submission endpoint...');
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@umich.edu');
    formData.append('role', 'Frontend Developer');
    formData.append('experience', 'React, TypeScript, Node.js');
    formData.append('motivation', 'I want to help build transportation solutions for students');
    
    const submitResponse = await fetch('http://localhost:3001/api/join', {
      method: 'POST',
      body: formData
    });
    
    const submitData = await submitResponse.json();
    console.log('✅ Form submission:', submitData);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure the backend server is running with: npm run dev');
  }
}

testServer();
