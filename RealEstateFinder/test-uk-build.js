// Test UK Properties Build Integration
console.log('🧪 Testing UK Properties Build Integration...\n');

// Import the properties module
import('./client/src/data/properties.ts')
  .then(module => {
    console.log('✅ Successfully imported properties module');
    console.log('Available exports:', Object.keys(module));
    
    if (module.generatedUKProperties) {
      console.log('✅ UK Properties found:', module.generatedUKProperties.length);
      console.log('Sample UK Property:', module.generatedUKProperties[0]);
    } else {
      console.log('❌ UK Properties not found');
    }
    
    if (module.allProperties) {
      console.log('✅ All Properties found:', module.allProperties.length);
      const ukCount = module.allProperties.filter(p => p.country === 'UK').length;
      console.log('UK Properties in allProperties:', ukCount);
    } else {
      console.log('❌ All Properties not found');
    }
    
    console.log('\n🎉 Test completed!');
  })
  .catch(error => {
    console.error('❌ Error importing properties module:', error);
  });
