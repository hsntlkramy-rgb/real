// Simple Properties Data - Direct UK Properties Inclusion
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

// Direct UK Properties Data - No generation, just static data
export const ukProperties: Property[] = [
  {
    id: 5001,
    title: "Modern Apartment in London - 2 Bedrooms",
    price: "£750,000",
    location: "Greater London, UK",
    country: "UK",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
    ],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    description: "Beautiful modern apartment in London with 2 bedrooms and 2 bathrooms. Modern amenities and prime location in Greater London.",
    tags: ["Apartment", "London", "2BR", "UK", "Residential", "Greater London"],
    personas: {
      remoteWorker: 0.8,
      family: 0.9,
      investor: 0.7,
      retiree: 0.6,
      luxury: 0.8
    },
    latitude: 51.5074,
    longitude: -0.1278,
    isActive: true,
    contactUrl: "/realestat/property/5001",
    lister_url: "/realestat/property/5001",
    contactPhone: "020 1234 5678",
    contactEmail: "agent1@ukrealestate.com",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Apartment",
    area: "Greater London",
    postcode: "SW1A 1AA",
    county: "Greater London"
  },
  {
    id: 5002,
    title: "Family House in Manchester - 3 Bedrooms",
    price: "£450,000",
    location: "Greater Manchester, UK",
    country: "UK",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    description: "Spacious family house in Manchester with 3 bedrooms and 2 bathrooms. Perfect for families with garden and parking.",
    tags: ["House", "Manchester", "3BR", "UK", "Residential", "Greater Manchester"],
    personas: {
      remoteWorker: 0.7,
      family: 0.9,
      investor: 0.6,
      retiree: 0.7,
      luxury: 0.6
    },
    latitude: 53.4808,
    longitude: -2.2426,
    isActive: true,
    contactUrl: "/realestat/property/5002",
    lister_url: "/realestat/property/5002",
    contactPhone: "0161 123 4567",
    contactEmail: "agent2@ukrealestate.com",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "House",
    area: "Greater Manchester",
    postcode: "M1 1AA",
    county: "Greater Manchester"
  },
  {
    id: 5003,
    title: "Luxury Penthouse in Birmingham - 4 Bedrooms",
    price: "£850,000",
    location: "West Midlands, UK",
    country: "UK",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80"
    ],
    img_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    description: "Stunning luxury penthouse in Birmingham with 4 bedrooms and 3 bathrooms. City views and premium finishes.",
    tags: ["Penthouse", "Birmingham", "4BR", "UK", "Residential", "West Midlands"],
    personas: {
      remoteWorker: 0.8,
      family: 0.8,
      investor: 0.9,
      retiree: 0.7,
      luxury: 0.9
    },
    latitude: 52.4862,
    longitude: -1.8904,
    isActive: true,
    contactUrl: "/realestat/property/5003",
    lister_url: "/realestat/property/5003",
    contactPhone: "0121 123 4567",
    contactEmail: "agent3@ukrealestate.com",
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Penthouse",
    area: "West Midlands",
    postcode: "B1 1AA",
    county: "West Midlands"
  }
];

// UAE Properties (simplified)
export const uaeProperties: Property[] = [
  {
    id: 3001,
    title: "Luxury Villa in Downtown Dubai - 3BR",
    price: "د.إ2,500,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Beautiful luxury villa in Downtown Dubai with 3 bedrooms. Modern amenities and prime location.",
    tags: ["Villa", "Downtown Dubai", "3BR", "UAE", "Residential"],
    personas: {
      remoteWorker: 0.8,
      family: 0.9,
      investor: 0.9,
      retiree: 0.7,
      luxury: 0.9
    },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    contactUrl: "/realestat/property/3001",
    lister_url: "/realestat/property/3001",
    contactPhone: "+971 50 123 4567",
    contactEmail: "agent1@realestate.com",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Villa",
    area: "Downtown Dubai"
  }
];

// All properties
export const allProperties: Property[] = [
  ...uaeProperties,
  ...ukProperties
];

// Load UK and Cyprus properties from JSON files
let loadedUkProperties: Property[] = [];
let loadedCyprusProperties: Property[] = [];
let allLoadedProperties: Property[] = [...uaeProperties];

const loadUkProperties = async (): Promise<Property[]> => {
  if (loadedUkProperties.length > 0) {
    return loadedUkProperties;
  }
  
  try {
    console.log('🔧 Loading UK properties from JSON file...');
    const response = await fetch('/realestat/uk-properties.json');
    if (!response.ok) {
      console.warn('Failed to load UK properties JSON, using fallback');
      return ukProperties; // fallback to static data
    }
    
    const ukPropsFromJson = await response.json();
    loadedUkProperties = ukPropsFromJson;
    allLoadedProperties = [...uaeProperties, ...loadedUkProperties, ...loadedCyprusProperties];
    
    console.log('✅ Successfully loaded UK properties from JSON:', loadedUkProperties.length);
    return loadedUkProperties;
  } catch (error) {
    console.warn('Error loading UK properties JSON, using fallback:', error);
    return ukProperties; // fallback to static data
  }
};

const loadCyprusProperties = async (): Promise<Property[]> => {
  if (loadedCyprusProperties.length > 0) {
    return loadedCyprusProperties;
  }
  
  try {
    console.log('🔧 Loading Cyprus properties from JSON file...');
    const response = await fetch('/realestat/cyprus-properties.json');
    if (!response.ok) {
      console.warn('Failed to load Cyprus properties JSON, using fallback');
      return []; // no fallback for Cyprus
    }
    
    const cyprusPropsFromJson = await response.json();
    loadedCyprusProperties = cyprusPropsFromJson;
    allLoadedProperties = [...uaeProperties, ...loadedUkProperties, ...loadedCyprusProperties];
    
    console.log('✅ Successfully loaded Cyprus properties from JSON:', loadedCyprusProperties.length);
    return loadedCyprusProperties;
  } catch (error) {
    console.warn('Error loading Cyprus properties JSON:', error);
    return []; // no fallback for Cyprus
  }
};

// Force UK properties to be included in the build by making them globally accessible
if (typeof window !== 'undefined') {
  (window as any).__UK_PROPERTIES__ = ukProperties;
  (window as any).__ALL_PROPERTIES__ = allProperties;
  console.log('🔧 UK Properties attached to window:', ukProperties.length);
}

// API functions
export const api = {
  getProperties: async (): Promise<Property[]> => {
    console.log('=== SIMPLE API getProperties called ===');
    
    // Load UK and Cyprus properties from JSON
    const ukProps = await loadUkProperties();
    const cyprusProps = await loadCyprusProperties();
    const allProps = [...uaeProperties, ...ukProps, ...cyprusProps];
    
    console.log('Total properties:', allProps.length);
    console.log('UK properties:', ukProps.length);
    console.log('Cyprus properties:', cyprusProps.length);
    console.log('UAE properties:', uaeProperties.length);
    return allProps;
  },

  getPropertiesByCountry: async (country: string): Promise<Property[]> => {
    if (country === 'UK') {
      return await loadUkProperties();
    }
    if (country === 'UAE') {
      return uaeProperties;
    }
    if (country === 'Cyprus') {
      return await loadCyprusProperties();
    }
    
    // Load all properties and return all
    const ukProps = await loadUkProperties();
    const cyprusProps = await loadCyprusProperties();
    return [...uaeProperties, ...ukProps, ...cyprusProps];
  },

  searchProperties: async (query: string): Promise<Property[]> => {
    const ukProps = await loadUkProperties();
    const cyprusProps = await loadCyprusProperties();
    const allProps = [...uaeProperties, ...ukProps, ...cyprusProps];
    
    const searchTerm = query.toLowerCase();
    return allProps.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm)
    );
  },

  getPropertyById: async (id: number): Promise<Property | null> => {
    const ukProps = await loadUkProperties();
    const cyprusProps = await loadCyprusProperties();
    const allProps = [...uaeProperties, ...ukProps, ...cyprusProps];
    return allProps.find(property => property.id === id) || null;
  }
};
