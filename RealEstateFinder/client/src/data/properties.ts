// Real Estate Properties Data - Multi-Country (UAE + UK)
export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  country: string;
  images: string[];
  img_url: string;
  description: string;
  tags: string[];
  personas: {
    remoteWorker: number;
    family: number;
    investor: number;
    retiree: number;
    luxury: number;
  };
  latitude: number;
  longitude: number;
  isActive: boolean;
  contactUrl: string;
  lister_url: string;
  contactPhone?: string;
  contactEmail?: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  area?: string;
  postcode?: string;
  county?: string;
}

// Generate UK properties inline to ensure they're always available
const generateUKProperties = (): Property[] => {
  console.log('🔧 Generating UK properties...');
  const properties: Property[] = [];
  
  // UK Cities with real coordinates
  const ukCities = [
    { name: 'London', lat: 51.5074, lng: -0.1278, area: 'Greater London' },
    { name: 'Manchester', lat: 53.4808, lng: -2.2426, area: 'Greater Manchester' },
    { name: 'Birmingham', lat: 52.4862, lng: -1.8904, area: 'West Midlands' },
    { name: 'Leeds', lat: 53.8008, lng: -1.5491, area: 'West Yorkshire' },
    { name: 'Liverpool', lat: 53.4084, lng: -2.9916, area: 'Merseyside' },
    { name: 'Newcastle', lat: 54.9783, lng: -1.6178, area: 'Tyne and Wear' },
    { name: 'Sheffield', lat: 53.3811, lng: -1.4701, area: 'South Yorkshire' },
    { name: 'Glasgow', lat: 55.8642, lng: -4.2518, area: 'Scotland' },
    { name: 'Edinburgh', lat: 55.9533, lng: -3.1883, area: 'Scotland' },
    { name: 'Cardiff', lat: 51.4816, lng: -3.1791, area: 'Wales' },
    { name: 'Bristol', lat: 51.4545, lng: -2.5879, area: 'Avon' },
    { name: 'Oxford', lat: 51.7520, lng: -1.2577, area: 'Oxfordshire' },
    { name: 'Cambridge', lat: 52.2053, lng: 0.1218, area: 'Cambridgeshire' },
    { name: 'Brighton', lat: 50.8225, lng: -0.1372, area: 'East Sussex' },
    { name: 'Bath', lat: 51.3754, lng: -1.5199, area: 'Somerset' },
    { name: 'York', lat: 53.9599, lng: -1.0793, area: 'North Yorkshire' },
    { name: 'Nottingham', lat: 52.9548, lng: -1.1581, area: 'Nottinghamshire' },
    { name: 'Leicester', lat: 52.6369, lng: -1.1398, area: 'Leicestershire' },
    { name: 'Coventry', lat: 52.4068, lng: -1.5197, area: 'West Midlands' },
    { name: 'Bradford', lat: 53.8008, lng: -1.5491, area: 'West Yorkshire' }
  ];

  const propertyTypes = ['House', 'Flat', 'Apartment', 'Cottage', 'Bungalow', 'Maisonette', 'Studio', 'Penthouse', 'Townhouse', 'Mews House'];

  // Real working Unsplash URLs for UK real estate
  const ukImageUrls = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  ];

  // Generate 150 realistic UK properties
  for (let i = 0; i < 150; i++) {
    const city = ukCities[i % ukCities.length];
    const propertyType = propertyTypes[i % propertyTypes.length];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * 3) + 1;
    
    // Generate realistic UK prices (in GBP)
    let price: number;
    if (city.name === 'London') {
      price = Math.floor(Math.random() * 2000000) + 300000; // £300k - £2.3M for London
    } else if (['Manchester', 'Birmingham', 'Leeds', 'Liverpool'].includes(city.name)) {
      price = Math.floor(Math.random() * 800000) + 150000; // £150k - £950k for major cities
    } else {
      price = Math.floor(Math.random() * 600000) + 120000; // £120k - £720k for other cities
    }
    
    // Generate realistic coordinates within each city area
    const lat = city.lat + (Math.random() - 0.5) * 0.1;
    const lng = city.lng + (Math.random() - 0.5) * 0.1;
    
    // Each property gets 3 working images
    const mainImage = ukImageUrls[i % ukImageUrls.length];
    const secondImage = ukImageUrls[(i + 1) % ukImageUrls.length];
    const thirdImage = ukImageUrls[(i + 2) % ukImageUrls.length];
    
    // Generate realistic UK postcodes
    const postcodes = ['M1', 'M2', 'M3', 'M4', 'M5', 'B1', 'B2', 'B3', 'B4', 'B5', 'L1', 'L2', 'L3', 'L4', 'L5'];
    const postcode = postcodes[i % postcodes.length] + ' ' + Math.floor(Math.random() * 9) + 'AB';
    
    // Generate realistic UK phone numbers
    const phonePrefixes = ['020', '0161', '0121', '0113', '0151', '0191', '0114', '0141', '0131', '029'];
    const phonePrefix = phonePrefixes[i % phonePrefixes.length];
    const phoneNumber = phonePrefix + ' ' + Math.floor(Math.random() * 9000000) + 1000000;
    
    // Each property gets a link to its own detail page
    const propertyDetailUrl = `/realestat/property/${5000 + i}`;
    
    const property: Property = {
      id: 5000 + i,
      title: `${propertyType} in ${city.name} - ${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`,
      price: `£${price.toLocaleString()}`,
      location: `${city.area}, UK`,
      country: 'UK',
      images: [mainImage, secondImage, thirdImage],
      img_url: mainImage,
      description: `Beautiful ${propertyType.toLowerCase()} in ${city.name} with ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''} and ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}. Modern amenities and prime location in ${city.area}.`,
      tags: [propertyType, city.name, `${bedrooms}BR`, 'UK', 'Residential', city.area],
      personas: {
        remoteWorker: Math.random() * 0.4 + 0.6,
        family: Math.random() * 0.4 + 0.6,
        investor: Math.random() * 0.4 + 0.6,
        retiree: Math.random() * 0.4 + 0.6,
        luxury: Math.random() * 0.4 + 0.6
      },
      latitude: lat,
      longitude: lng,
      isActive: true,
      contactUrl: propertyDetailUrl,
      lister_url: propertyDetailUrl,
      contactPhone: phoneNumber,
      contactEmail: `agent${i + 1}@ukrealestate.com`,
      bedrooms,
      bathrooms,
      propertyType,
      area: city.area,
      postcode,
      county: city.area
    };
    
    properties.push(property);
  }
  
  console.log(`✅ Generated ${properties.length} UK properties`);
  return properties;
};

// Generate 400+ real-looking UAE properties with WORKING images
export const generateUAEProperties = (): Property[] => {
  const properties: Property[] = [];
  
  // UAE Cities with real coordinates
  const uaeCities = [
    { name: 'Downtown Dubai', lat: 25.2048, lng: 55.2708, area: 'Downtown Dubai' },
    { name: 'Dubai Marina', lat: 25.1972, lng: 55.2744, area: 'Dubai Marina' },
    { name: 'Palm Jumeirah', lat: 25.1124, lng: 55.1390, area: 'Palm Jumeirah' },
    { name: 'JBR', lat: 25.0789, lng: 55.1378, area: 'Jumeirah Beach Residence' },
    { name: 'Business Bay', lat: 25.1867, lng: 55.2644, area: 'Business Bay' },
    { name: 'Dubai Hills Estate', lat: 25.0589, lng: 55.2389, area: 'Dubai Hills Estate' },
    { name: 'Sharjah', lat: 25.3463, lng: 55.4209, area: 'Sharjah' },
    { name: 'Ajman', lat: 25.4058, lng: 55.5133, area: 'Ajman' },
    { name: 'Ras Al Khaimah', lat: 25.6741, lng: 55.9804, area: 'Ras Al Khaimah' },
    { name: 'Fujairah', lat: 25.3298, lng: 56.3264, area: 'Fujairah' },
    { name: 'Umm Al Quwain', lat: 25.5654, lng: 55.5553, area: 'Umm Al Quwain' },
    { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773, area: 'Abu Dhabi' },
    { name: 'Al Ain', lat: 24.2075, lng: 55.7447, area: 'Al Ain' },
    { name: 'Liwa Oasis', lat: 23.1322, lng: 53.7843, area: 'Liwa Oasis' },
    { name: 'Dubai Silicon Oasis', lat: 25.1198, lng: 55.3778, area: 'Dubai Silicon Oasis' },
    { name: 'Dubai Sports City', lat: 25.0389, lng: 55.2000, area: 'Dubai Sports City' },
    { name: 'Dubai Production City', lat: 25.0589, lng: 55.2389, area: 'Dubai Production City' },
    { name: 'Dubai International City', lat: 25.1589, lng: 55.3189, area: 'Dubai International City' },
    { name: 'Dubai Motor City', lat: 25.0589, lng: 55.2389, area: 'Dubai Motor City' },
    { name: 'Dubai Studio City', lat: 25.0589, lng: 55.2389, area: 'Dubai Studio City' },
    { name: 'Dubai Knowledge Park', lat: 25.0589, lng: 55.2389, area: 'Dubai Knowledge Park' }
  ];

  const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio', 'Duplex', 'Loft', 'Garden Apartment'];
  
  // Real working Unsplash URLs for real estate
  const workingImageUrls = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  ];
  
  // Generate 400 properties with working images
  for (let i = 0; i < 400; i++) {
    const city = uaeCities[i % uaeCities.length];
    const propertyType = propertyTypes[i % propertyTypes.length];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const price = Math.floor(Math.random() * 8000000) + 500000;
    
    // Generate realistic coordinates within each city area
    const lat = city.lat + (Math.random() - 0.5) * 0.1;
    const lng = city.lng + (Math.random() - 0.5) * 0.1;
    
    // Each property gets 3 working images
    const mainImage = workingImageUrls[i % workingImageUrls.length];
    const secondImage = workingImageUrls[(i + 1) % workingImageUrls.length];
    const thirdImage = workingImageUrls[(i + 2) % workingImageUrls.length];
    
    // Each property gets a link to its own detail page on your website
    const propertyDetailUrl = `/realestat/property/${3000 + i}`;
    
    const property: Property = {
      id: 3000 + i,
      title: `${propertyType} in ${city.name} - ${bedrooms}BR`,
      price: `د.إ${price.toLocaleString()}`,
      location: `${city.area}, UAE`,
      country: 'UAE',
      images: [mainImage, secondImage, thirdImage],
      img_url: mainImage,
      description: `Beautiful ${propertyType.toLowerCase()} in ${city.name} with ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}. Modern amenities and prime location.`,
      tags: [propertyType, city.name, `${bedrooms}BR`, 'UAE', 'Residential'],
      personas: {
        remoteWorker: Math.random() * 0.4 + 0.6,
        family: Math.random() * 0.4 + 0.6,
        investor: Math.random() * 0.4 + 0.6,
        retiree: Math.random() * 0.4 + 0.6,
        luxury: Math.random() * 0.4 + 0.6
      },
      latitude: lat,
      longitude: lng,
      isActive: true,
      contactUrl: propertyDetailUrl,
      lister_url: propertyDetailUrl,
      contactPhone: `+971 ${Math.floor(Math.random() * 90000000) + 10000000}`,
      contactEmail: `agent${i + 1}@realestate.com`,
      bedrooms,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      propertyType,
      area: city.area
    };
    
    properties.push(property);
  }
  
  return properties;
};

// Generate the properties immediately
export const generatedUAEProperties = generateUAEProperties();
export const generatedUKProperties = generateUKProperties();

// All properties - now includes both UAE and UK properties
export const allProperties: Property[] = [
  ...generatedUAEProperties, // 400+ UAE properties
  ...generatedUKProperties   // 150+ UK properties
];

// API functions that work with both UAE and UK properties
export const api = {
  // Get all properties - returns both UAE and UK properties
  getProperties: async (): Promise<Property[]> => {
    console.log('=== DEBUG: API getProperties called ===');
    console.log('Total properties in allProperties:', allProperties.length);
    console.log('Generated UAE properties count:', generatedUAEProperties.length);
    console.log('Generated UK properties count:', generatedUKProperties.length);
    console.log('First 5 properties:', allProperties.slice(0, 5).map(p => ({ id: p.id, title: p.title, country: p.country })));
    console.log('=== END DEBUG ===');
    return allProperties;
  },

  // Search properties - works with both UAE and UK data
  searchProperties: async (query: string): Promise<Property[]> => {
    const searchTerm = query.toLowerCase();
    const results = allProperties.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    console.log('Search results:', results.length, 'properties found for query:', query);
    return results;
  },

  // Get properties by country - returns data immediately
  getPropertiesByCountry: async (country: string): Promise<Property[]> => {
    if (country === 'All') {
      console.log('Returning all properties:', allProperties.length);
      return allProperties;
    }
    
    if (country === 'UAE') {
      console.log('Returning UAE properties:', generatedUAEProperties.length);
      return generatedUAEProperties;
    }
    
    if (country === 'UK') {
      console.log('Returning UK properties:', generatedUKProperties.length);
      return generatedUKProperties;
    }
    
    // For other countries, return empty array
    console.log(`No properties for ${country}, returning empty array`);
    return [];
  },

  // Get property by ID - works with both UAE and UK properties
  getPropertyById: async (id: number): Promise<Property | null> => {
    const property = allProperties.find(property => property.id === id);
    console.log('Property by ID:', id, property ? 'found' : 'not found');
    return property || null;
  }
};
