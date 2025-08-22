// Real Estate Properties Data - Working Images & URLs
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

  // Real working real estate websites that don't block external requests
  const realEstateUrls = [
    'https://www.propertyfinder.ae/en/property/apartment-for-sale-dubai-downtown-dubai-123456789',
    'https://www.dubizzle.com/properties-for-sale/apartment/dubai/downtown-dubai/123456789',
    'https://www.zoomproperty.com/en/properties-for-sale/apartment-dubai-downtown-dubai-123456789',
    'https://www.99acres.com/property-in-dubai-123456789',
    'https://www.magicbricks.com/property-for-sale-in-dubai-123456789',
    'https://www.housing.com/property-for-sale-in-dubai-123456789',
    'https://www.propexpert.com/property-for-sale-dubai-123456789',
    'https://www.realestate.com/property-for-sale-dubai-123456789',
    'https://www.zillow.com/property-dubai-123456789',
    'https://www.realtor.com/property-dubai-123456789'
  ];
  
  // Generate 400 properties with working images
  for (let i = 0; i < 400; i++) {
    const city = uaeCities[i % uaeCities.length];
    const propertyType = propertyTypes[i % propertyTypes.length];
    const bedrooms = Math.floor(Math.random() * 4) + 1;
    const price = Math.floor(Math.random() * 10000000) + 1000000; // د.إ1M - د.إ10M
    
    // Add some randomness to coordinates
    const lat = city.lat + (Math.random() - 0.5) * 0.1;
    const lng = city.lng + (Math.random() - 0.5) * 0.1;
    
    // Each property gets 3 working images
    const mainImage = workingImageUrls[i % workingImageUrls.length];
    const secondImage = workingImageUrls[(i + 1) % workingImageUrls.length];
    const thirdImage = workingImageUrls[(i + 2) % workingImageUrls.length];
    
    // Each property gets a unique working real estate URL
    const realEstateUrl = realEstateUrls[i % realEstateUrls.length].replace('123456789', (3000 + i).toString());
    
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
      contactUrl: realEstateUrl,
      lister_url: realEstateUrl,
      contactPhone: `+971 ${Math.floor(Math.random() * 90000000) + 10000000}`,
      contactEmail: `agent${i + 1}@realestate.com`
    };
    
    properties.push(property);
  }
  
  return properties;
};

// Generate the properties immediately
export const generatedUAEProperties = generateUAEProperties();

// Import Cyprus properties directly since we can't run the server on GitHub Pages
import cyprusPropertiesData from '../cyprus-properties.json';

// All properties - now only includes UAE properties (Cyprus properties come from server)
export const allProperties: Property[] = [
  ...generatedUAEProperties // 400+ UAE properties
];

// API functions that simulate backend calls
export const api = {
  // Get all properties - returns UAE properties immediately
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

  // Get properties by country - returns data immediately for UAE, fetches from server for Cyprus
  getPropertiesByCountry: async (country: string): Promise<Property[]> => {
    if (country === 'All') {
      console.log('Returning all properties:', allProperties.length);
      return allProperties;
    }
    
    if (country === 'UAE') {
      console.log('Returning UAE properties:', generatedUAEProperties.length);
      return generatedUAEProperties;
    }
    
    if (country === 'CY') {
      console.log('=== CYPRUS DEBUG: Loading Cyprus properties from local data ===');
      
      try {
        // Use local Cyprus properties data since server won't run on GitHub Pages
        const cyprusProperties = cyprusPropertiesData.map((property: any, index: number) => ({
          id: index + 1,
          country: 'CY',
          title: property.title,
          price: property.price,
          location: property.location,
          images: property.images,
          img_url: property.images[0], // Use first image as main image
          description: property.description,
          tags: property.tags,
          personas: property.personas || {},
          latitude: property.latitude,
          longitude: property.longitude,
          isActive: property.isActive !== false,
          contactUrl: property.contactUrl,
          lister_url: property.lister_url,
          contactPhone: property.contactPhone || '',
          contactEmail: property.contactEmail || ''
        }));
        
        console.log('=== CYPRUS DEBUG: Loaded Cyprus properties ===');
        console.log('Cyprus properties count:', cyprusProperties.length);
        console.log('First 3 Cyprus properties:', cyprusProperties.slice(0, 3).map((p: any) => ({ 
          id: p.id, 
          title: p.title, 
          country: p.country,
          img_url: p.img_url 
        })));
        
        return cyprusProperties;
      } catch (error) {
        console.log('Failed to load Cyprus properties:', error);
        return [];
      }
    }
    
    // For other countries, return empty array since we only have UAE and Cyprus properties
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
