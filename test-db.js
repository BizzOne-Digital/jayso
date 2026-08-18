// Quick database connection test
require('dotenv').config();
const mongoose = require('mongoose');

async function testDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI?.substring(0, 50) + '...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB!');
    
    // Check services
    const servicesCount = await mongoose.connection.db.collection('services').countDocuments();
    console.log(`📊 Services in database: ${servicesCount}`);
    
    // Get first service
    const firstService = await mongoose.connection.db.collection('services').findOne();
    console.log('📝 First service:', firstService ? firstService.title : 'None found');
    
    // Check markets
    const marketsCount = await mongoose.connection.db.collection('markets').countDocuments();
    console.log(`📊 Markets in database: ${marketsCount}`);
    
    // Check offers
    const offersCount = await mongoose.connection.db.collection('offers').countDocuments();
    console.log(`📊 Offers in database: ${offersCount}`);
    
    // Check FAQs
    const faqsCount = await mongoose.connection.db.collection('faqs').countDocuments();
    console.log(`📊 FAQs in database: ${faqsCount}`);
    
    await mongoose.connection.close();
    console.log('✅ Test completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDB();
