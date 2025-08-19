// Test script for UK Properties Generation
const { generateUKProperties } = require('./client/src/data/uk-properties.ts');

console.log('🧪 Testing UK Properties Generation...\n');

try {
  // Generate UK properties
  const ukProperties = generateUKProperties();
  
  console.log(`✅ Successfully generated ${ukProperties.length} UK properties\n`);
  
  // Show sample properties
  console.log('📋 Sample UK Properties:');
  ukProperties.slice(0, 3).forEach((property, index) => {
    console.log(`\n${index + 1}. ${property.title}`);
    console.log(`   Price: ${property.price}`);
    console.log(`   Location: ${property.location}`);
    console.log(`   Country: ${property.country}`);
    console.log(`   Bedrooms: ${property.bedrooms}`);
    console.log(`   Bathrooms: ${property.bathrooms}`);
    console.log(`   Postcode: ${property.postcode}`);
    console.log(`   Coordinates: ${property.latitude}, ${property.longitude}`);
  });
  
  // Show statistics
  const cities = [...new Set(ukProperties.map(p => p.location.split(',')[0]))];
  const propertyTypes = [...new Set(ukProperties.map(p => p.propertyType))];
  
  console.log('\n📊 Statistics:');
  console.log(`   Cities: ${cities.length} (${cities.slice(0, 5).join(', ')}...)`);
  console.log(`   Property Types: ${propertyTypes.length} (${propertyTypes.join(', ')})`);
  console.log(`   Price Range: £${Math.min(...ukProperties.map(p => parseInt(p.price.replace(/[£,]/g, ''))))} - £${Math.max(...ukProperties.map(p => parseInt(p.price.replace(/[£,]/g, ''))))}`);
  
  console.log('\n🎉 UK Properties test completed successfully!');
  
} catch (error) {
  console.error('❌ Error testing UK properties:', error);
}
