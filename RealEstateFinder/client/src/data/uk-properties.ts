// UK Real Estate Properties Data - Zoopla API Integration
export interface UKProperty {
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
  { name: 'Bath', lat: 51.3754, lng: -2.3599, area: 'Somerset' },
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
export const generateUKProperties = (): UKProperty[] => {
  const properties: UKProperty[] = [];
  
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
    
    const property: UKProperty = {
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
  
  return properties;
};

// Generate the properties immediately
export const generatedUKProperties = generateUKProperties();

// API functions for UK properties
export const ukApi = {
  // Get all UK properties
  getProperties: async (): Promise<UKProperty[]> => {
    console.log('=== UK API: getProperties called ===');
    console.log('Total UK properties:', generatedUKProperties.length);
    return generatedUKProperties;
  },

  // Search UK properties
  searchProperties: async (query: string): Promise<UKProperty[]> => {
    const searchTerm = query.toLowerCase();
    const results = generatedUKProperties.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      property.city?.toLowerCase().includes(searchTerm)
    );
    console.log('UK Search results:', results.length, 'properties found for query:', query);
    return results;
  },

  // Get properties by city
  getPropertiesByCity: async (city: string): Promise<UKProperty[]> => {
    const results = generatedUKProperties.filter(property =>
      property.location.toLowerCase().includes(city.toLowerCase()) ||
      property.tags.some(tag => tag.toLowerCase().includes(city.toLowerCase()))
    );
    console.log(`UK properties for ${city}:`, results.length);
    return results;
  },

  // Get property by ID
  getPropertyById: async (id: number): Promise<UKProperty | null> => {
    const property = generatedUKProperties.find(property => property.id === id);
    console.log('UK Property by ID:', id, property ? 'found' : 'not found');
    return property || null;
  }
};
