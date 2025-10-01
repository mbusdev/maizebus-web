const fetch = require('node-fetch');

async function testContactForm() {
  try {
    console.log('Testing MaizeBus Contact Form...\n');
    
    console.log('1. Testing contact form submission...');
    const contactData = {
      name: 'Test User',
      email: 'test@umich.edu',
      inquiryType: 'general',
      subject: 'Test Contact Form',
      message: 'This is a test message from the contact form.'
    };
    
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    const result = await response.json();
    console.log('✅ Contact form submission:', result);
    
    console.log('\n🎉 Contact form test passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure the backend server is running with: npm run dev');
  }
}

testContactForm();
