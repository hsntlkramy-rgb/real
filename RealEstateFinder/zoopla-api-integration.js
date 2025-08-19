// Zoopla API Integration Script for Real UK Properties
// This script demonstrates how to integrate with the real Zoopla API
// You can use this as a reference for implementing real API calls

const axios = require('axios');

// Zoopla API Configuration
const ZOOPLA_CONFIG = {
  baseURL: 'https://zoopla.p.rapidapi.com',
  apiKey: '29ab6001ffmsh00d0be7a4829957p1e3501jsn0c0182578f54',
  host: 'zoopla.p.rapidapi.com'
};

// UK Cities for property search
const UK_CITIES = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool',
  'Newcastle', 'Sheffield', 'Glasgow', 'Edinburgh', 'Cardiff',
  'Bristol', 'Oxford', 'Cambridge', 'Brighton', 'Bath',
  'York', 'Nottingham', 'Leicester', 'Coventry', 'Bradford'
];

// Property categories
const PROPERTY_CATEGORIES = ['residential', 'commercial', 'land'];

// Property types
const PROPERTY_TYPES = ['house', 'flat', 'apartment', 'cottage', 'bungalow'];

// Zoopla API Functions
class ZooplaAPI {
  constructor(config) {
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: {
        'x-rapidapi-key': config.apiKey,
        'x-rapidapi-host': config.host
      }
    });
  }

  // Search properties by location
  async searchProperties(location, options = {}) {
    const defaultOptions = {
      locationValue: location,
      category: 'residential',
      furnishedState: 'Any',
      sortOrder: 'newest_listings',
      page: '1',
      pageSize: '25'
    };

    const searchParams = { ...defaultOptions, ...options };

    try {
      console.log(`🔍 Searching properties in ${location}...`);
      
      const response = await this.axiosInstance.get('/properties/v2/list', {
        params: searchParams
      });

      console.log(`✅ Found ${response.data.listing.length || 0} properties in ${location}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error searching properties in ${location}:`, error.message);
      return null;
    }
  }

  // Get property details by ID
  async getPropertyDetails(propertyId) {
    try {
      console.log(`🏠 Fetching details for property ${propertyId}...`);
      
      const response = await this.axiosInstance.get(`/properties/v2/detail`, {
        params: { property_id: propertyId }
      });

      console.log(`✅ Property details retrieved for ${propertyId}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching property details for ${propertyId}:`, error.message);
      return null;
    }
  }

  // Get auto-complete suggestions
  async getAutoComplete(query) {
    try {
      console.log(`🔍 Getting auto-complete suggestions for: ${query}`);
      
      const response = await this.axiosInstance.get('/v2/auto-complete', {
        params: { search_term: query }
      });

      console.log(`✅ Auto-complete suggestions retrieved`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error getting auto-complete suggestions:`, error.message);
      return null;
    }
  }

  // Search properties across multiple cities
  async searchMultipleCities(cities = UK_CITIES, options = {}) {
    console.log(`🌍 Searching properties across ${cities.length} UK cities...`);
    
    const allProperties = [];
    const cityResults = {};

    for (const city of cities) {
      try {
        const result = await this.searchProperties(city, options);
        if (result && result.listing) {
          cityResults[city] = result.listing.length;
          allProperties.push(...result.listing);
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Error searching in ${city}:`, error.message);
      }
    }

    console.log('\n📊 City-wise Results:');
    Object.entries(cityResults).forEach(([city, count]) => {
      console.log(`   ${city}: ${count} properties`);
    });

    console.log(`\n🎯 Total properties found: ${allProperties.length}`);
    return allProperties;
  }

  // Transform Zoopla data to our app format
  transformZooplaData(zooplaProperty) {
    return {
      id: zooplaProperty.listing_id || Math.random().toString(36).substr(2, 9),
      title: zooplaProperty.title || `${zooplaProperty.property_type} in ${zooplaProperty.location}`,
      price: `£${zooplaProperty.price || 'POA'}`,
      location: zooplaProperty.location || 'UK',
      country: 'UK',
      images: zooplaProperty.image_url ? [zooplaProperty.image_url] : [],
      img_url: zooplaProperty.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      description: zooplaProperty.description || 'Beautiful property in the UK',
      tags: [
        zooplaProperty.property_type || 'Residential',
        zooplaProperty.location || 'UK',
        `${zooplaProperty.num_bedrooms || 'N/A'}BR`,
        'UK',
        'Residential'
      ],
      personas: {
        remoteWorker: Math.random() * 0.4 + 0.6,
        family: Math.random() * 0.4 + 0.6,
        investor: Math.random() * 0.4 + 0.6,
        retiree: Math.random() * 0.4 + 0.6,
        luxury: Math.random() * 0.4 + 0.6
      },
      latitude: zooplaProperty.latitude || 51.5074,
      longitude: zooplaProperty.longitude || -0.1278,
      isActive: true,
      contactUrl: zooplaProperty.details_url || '#',
      lister_url: zooplaProperty.details_url || '#',
      contactPhone: zooplaProperty.phone || 'N/A',
      contactEmail: 'agent@zoopla.com',
      bedrooms: zooplaProperty.num_bedrooms || 1,
      bathrooms: zooplaProperty.num_bathrooms || 1,
      propertyType: zooplaProperty.property_type || 'Residential',
      area: zooplaProperty.location || 'UK',
      postcode: zooplaProperty.postcode || 'N/A',
      county: zooplaProperty.county || 'UK'
    };
  }
}

// Example usage and testing
async function testZooplaAPI() {
  console.log('🚀 Testing Zoopla API Integration...\n');
  
  const zoopla = new ZooplaAPI(ZOOPLA_CONFIG);
  
  try {
    // Test 1: Search properties in Oxford (as per your example)
    console.log('📋 Test 1: Searching properties in Oxford');
    const oxfordResults = await zoopla.searchProperties('Oxford, Oxfordshire', {
      category: 'residential',
      furnishedState: 'Any',
      sortOrder: 'newest_listings',
      page: '1'
    });
    
    if (oxfordResults && oxfordResults.listing) {
      console.log(`   Found ${oxfordResults.listing.length} properties in Oxford`);
      
      // Show first property details
      if (oxfordResults.listing.length > 0) {
        const firstProperty = oxfordResults.listing[0];
        console.log('\n   First property:');
        console.log(`   - Title: ${firstProperty.title || 'N/A'}`);
        console.log(`   - Price: £${firstProperty.price || 'POA'}`);
        console.log(`   - Location: ${firstProperty.location || 'N/A'}`);
        console.log(`   - Bedrooms: ${firstProperty.num_bedrooms || 'N/A'}`);
        
        // Transform to our app format
        const transformedProperty = zoopla.transformZooplaData(firstProperty);
        console.log('\n   Transformed property:');
        console.log(`   - ID: ${transformedProperty.id}`);
        console.log(`   - Price: ${transformedProperty.price}`);
        console.log(`   - Tags: ${transformedProperty.tags.join(', ')}`);
      }
    }
    
    // Test 2: Auto-complete
    console.log('\n📋 Test 2: Testing auto-complete');
    const autoCompleteResults = await zoopla.getAutoComplete('London');
    if (autoCompleteResults) {
      console.log('   Auto-complete working');
    }
    
    // Test 3: Search in a few major cities
    console.log('\n📋 Test 3: Searching in major cities');
    const majorCities = ['London', 'Manchester', 'Birmingham'];
    const majorCityResults = await zoopla.searchMultipleCities(majorCities, {
      category: 'residential',
      pageSize: '10'
    });
    
    console.log(`\n🎉 API testing completed! Total properties found: ${majorCityResults.length}`);
    
  } catch (error) {
    console.error('❌ API testing failed:', error.message);
  }
}

// Export for use in other files
module.exports = {
  ZooplaAPI,
  ZOOPLA_CONFIG,
  UK_CITIES,
  testZooplaAPI
};

// Run test if this file is executed directly
if (require.main === module) {
  testZooplaAPI();
}
