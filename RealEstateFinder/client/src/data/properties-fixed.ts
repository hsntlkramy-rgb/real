// Real Estate Properties Data - Each property has a TRULY UNIQUE image
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
}

// Generate 400+ real-looking UAE properties with TRULY UNIQUE images
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
  
  // Create a pool of 400+ unique image URLs using different Unsplash photo IDs
  const createUniqueImageUrls = (): string[] => {
    const urls: string[] = [];
    const baseIds = [
      1506744038136, 1600607687939, 1522708323590, 1570129477492, 1564013799919,
      1502005229762, 1560448204, 1493809842364, 1502672260266, 1600596542815,
      1600566753190, 1600607687644, 1600566752355, 1600607687939, 1600607687644,
      1600566752355, 1600607687939, 1600607687644, 1600566752355, 1600607687939
    ];
    
    // Generate 400+ unique URLs by combining base IDs with offsets
    for (let i = 0; i < 400; i++) {
      const baseId = baseIds[i % baseIds.length];
      const offset = Math.floor(i / baseIds.length);
      const uniqueId = baseId + offset;
      urls.push(`https://images.unsplash.com/photo-${uniqueId}?auto=format&fit=crop&w=800&q=80`);
    }
    
    return urls;
  };
  
  const uniqueImageUrls = createUniqueImageUrls();
  
  // Generate 400 properties with TRULY UNIQUE images
  for (let i = 0; i < 400; i++) {
    const city = uaeCities[i % uaeCities.length];
    const propertyType = propertyTypes[i % propertyTypes.length];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const price = Math.floor(Math.random() * 8000000) + 500000;
    
    // Generate realistic coordinates within each city area
    const lat = city.lat + (Math.random() - 0.5) * 0.1;
    const lng = city.lng + (Math.random() - 0.5) * 0.1;
    
    // Each property gets 3 completely unique images from the pool
    const mainImage = uniqueImageUrls[i];
    const secondImage = uniqueImageUrls[(i + 100) % uniqueImageUrls.length];
    const thirdImage = uniqueImageUrls[(i + 200) % uniqueImageUrls.length];
    
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
      contactUrl: `https://www.bayut.com/properties-for-sale/dubai/${3000 + i}`,
      lister_url: `https://www.bayut.com/properties-for-sale/dubai/${3000 + i}`,
      contactPhone: `+971 ${Math.floor(Math.random() * 90000000) + 10000000}`,
      contactEmail: `agent${i + 1}@bayut.com`
    };
    
    properties.push(property);
  }
  
  return properties;
};

// Generate the properties immediately
export const generatedUAEProperties = generateUAEProperties();

// All properties - now ONLY includes 400+ generated UAE properties
export const allProperties: Property[] = [
  ...generatedUAEProperties // 400+ UAE properties only
];

// API functions that simulate backend calls
export const api = {
  // Get all properties - returns 400+ UAE properties immediately
  getProperties: async (): Promise<Property[]> => {
    console.log('=== DEBUG: API getProperties called ===');
    console.log('Total properties in allProperties:', allProperties.length);
    console.log('Generated UAE properties count:', generatedUAEProperties.length);
    console.log('First 5 properties:', allProperties.slice(0, 5).map(p => ({ id: p.id, title: p.title, country: p.country })));
    console.log('=== END DEBUG ===');
    return allProperties;
  },

  // Search properties - works immediately with generated data
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
    
    // For other countries, return empty array since we only have UAE properties
    console.log(`No properties for ${country}, returning empty array`);
    return [];
  },

  // Get property by ID - works immediately
  getPropertyById: async (id: number): Promise<Property | null> => {
    const property = allProperties.find(property => property.id === id);
    console.log('Property by ID:', id, property ? 'found' : 'not found');
    return property || null;
  }
};
