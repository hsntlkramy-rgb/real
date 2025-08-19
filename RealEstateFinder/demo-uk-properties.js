// Demo Script for UK Properties
// This script demonstrates the UK properties generation without requiring the full React app

console.log('🇬🇧 UK Properties Demo - RealEstateFinder\n');

// Simulate the UK properties data structure
const ukCities = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool',
  'Newcastle', 'Sheffield', 'Glasgow', 'Edinburgh', 'Cardiff'
];

const propertyTypes = ['House', 'Flat', 'Apartment', 'Cottage', 'Bungalow'];

// Generate sample UK properties
function generateSampleUKProperties(count = 10) {
  const properties = [];
  
  for (let i = 0; i < count; i++) {
    const city = ukCities[i % ukCities.length];
    const propertyType = propertyTypes[i % propertyTypes.length];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * 3) + 1;
    
    // Generate realistic UK prices
    let price;
    if (city === 'London') {
      price = Math.floor(Math.random() * 2000000) + 300000; // £300k - £2.3M
    } else if (['Manchester', 'Birmingham', 'Leeds', 'Liverpool'].includes(city)) {
      price = Math.floor(Math.random() * 800000) + 150000; // £150k - £950k
    } else {
      price = Math.floor(Math.random() * 600000) + 120000; // £120k - £720k
    }
    
    // Generate UK postcode
    const postcodes = ['M1', 'B1', 'L1', 'N1', 'S1', 'G1', 'E1', 'C1', 'Y1', 'N1'];
    const postcode = postcodes[i % postcodes.length] + ' ' + Math.floor(Math.random() * 9) + 'AB';
    
    // Generate UK phone number
    const phonePrefixes = ['020', '0161', '0121', '0113', '0151', '0191', '0114', '0141', '0131', '029'];
    const phonePrefix = phonePrefixes[i % phonePrefixes.length];
    const phoneNumber = phonePrefix + ' ' + Math.floor(Math.random() * 9000000) + 1000000;
    
    const property = {
      id: 5000 + i,
      title: `${propertyType} in ${city} - ${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`,
      price: `£${price.toLocaleString()}`,
      location: `${city}, UK`,
      country: 'UK',
      bedrooms,
      bathrooms,
      propertyType,
      postcode,
      contactPhone: phoneNumber,
      contactEmail: `agent${i + 1}@ukrealestate.com`,
      image: `https://images.unsplash.com/photo-${1564013799919 + i}?auto=format&fit=crop&w=800&q=80`
    };
    
    properties.push(property);
  }
  
  return properties;
}

// Display sample properties
function displayProperties(properties) {
  console.log('🏠 Sample UK Properties:\n');
  
  properties.forEach((property, index) => {
    console.log(`${index + 1}. ${property.title}`);
    console.log(`   💰 Price: ${property.price}`);
    console.log(`   📍 Location: ${property.location}`);
    console.log(`   🛏️  Bedrooms: ${property.bedrooms}`);
    console.log(`   🚿 Bathrooms: ${property.bathrooms}`);
    console.log(`   🏘️  Type: ${property.propertyType}`);
    console.log(`   📮 Postcode: ${property.postcode}`);
    console.log(`   📞 Phone: ${property.contactPhone}`);
    console.log(`   📧 Email: ${property.contactEmail}`);
    console.log('');
  });
}

// Show statistics
function showStatistics(properties) {
  const cities = [...new Set(properties.map(p => p.location.split(',')[0]))];
  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
  
  console.log('📊 Statistics:');
  console.log(`   🌍 Cities: ${cities.length} (${cities.slice(0, 5).join(', ')}...)`);
  console.log(`   🏠 Property Types: ${propertyTypes.length} (${propertyTypes.join(', ')})`);
  console.log(`   💰 Total Properties: ${properties.length}`);
  
  // Price analysis
  const prices = properties.map(p => parseInt(p.price.replace(/[£,]/g, '')));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  
  console.log(`   💰 Price Range: £${minPrice.toLocaleString()} - £${maxPrice.toLocaleString()}`);
  console.log(`   💰 Average Price: £${avgPrice.toLocaleString()}`);
}

// Run the demo
function runDemo() {
  console.log('🚀 Starting UK Properties Demo...\n');
  
  // Generate 10 sample properties
  const sampleProperties = generateSampleUKProperties(10);
  
  // Display properties
  displayProperties(sampleProperties);
  
  // Show statistics
  showStatistics(sampleProperties);
  
  console.log('\n🎉 Demo completed successfully!');
  console.log('\n💡 To see more properties:');
  console.log('   1. Visit your app at /test-uk');
  console.log('   2. Use the home page to see all properties');
  console.log('   3. Try the property comparison feature');
  console.log('   4. Test the search functionality');
  
  console.log('\n🔗 Quick Links:');
  console.log('   - Home Page: /');
  console.log('   - UK Test Page: /test-uk');
  console.log('   - Map View: /map');
  console.log('   - Swipe View: /swipe');
}

// Run the demo immediately
runDemo();
