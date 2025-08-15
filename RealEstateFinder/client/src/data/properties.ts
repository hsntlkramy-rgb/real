import { PropertyWithScore } from '@/lib/types';

// Client-side property data - no backend needed!
export const properties: PropertyWithScore[] = [
  {
    id: 1,
    title: "Modern Apartment in Dubai Marina",
    price: "د.إ2,500,000",
    location: "Dubai Marina, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful modern apartment with marina views",
    tags: ["Apartment", "Modern", "Marina View"],
    personas: { remoteWorker: 0.8, family: 0.6, investor: 0.7, retiree: 0.4, luxury: 0.8 },
    latitude: 25.1972,
    longitude: 55.2744,
    isActive: true
  },
  {
    id: 2,
    title: "Luxury Villa in Palm Jumeirah",
    price: "د.إ8,500,000",
    location: "Palm Jumeirah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive villa with private beach access",
    tags: ["Villa", "Luxury", "Beach Access"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.9, retiree: 0.7, luxury: 0.95 },
    latitude: 25.0657,
    longitude: 55.1713,
    isActive: true
  },
  {
    id: 3,
    title: "Cozy Studio in London",
    price: "£450,000",
    location: "Shoreditch, London",
    country: "UK",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    description: "Modern studio apartment in trendy Shoreditch",
    tags: ["Studio", "Modern", "City Center"],
    personas: { remoteWorker: 0.9, family: 0.2, investor: 0.8, retiree: 0.3, luxury: 0.6 },
    latitude: 51.5074,
    longitude: -0.1278,
    isActive: true
  },
  {
    id: 4,
    title: "Villa in Tuscany",
    price: "€800,000",
    location: "Tuscany, Italy",
    country: "Italy",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful villa in the heart of Tuscany",
    tags: ["Villa", "Tuscany", "Countryside"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.6, retiree: 0.9, luxury: 0.7 },
    latitude: 43.7696,
    longitude: 11.2558,
    isActive: true
  },
  {
    id: 5,
    title: "Modern Condo in Manhattan",
    price: "$1,200,000",
    location: "Manhattan, New York",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Luxury condo in the heart of Manhattan",
    tags: ["Condo", "Modern", "City View"],
    personas: { remoteWorker: 0.9, family: 0.4, investor: 0.8, retiree: 0.3, luxury: 0.9 },
    latitude: 40.7589,
    longitude: -73.9851,
    isActive: true
  },
  {
    id: 6,
    title: "Beachfront Villa in JBR",
    price: "د.إ12,500,000",
    location: "Jumeirah Beach Residence, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive beachfront villa with private access",
    tags: ["Villa", "Beachfront", "Luxury"],
    personas: { remoteWorker: 0.7, family: 0.9, investor: 0.95, retiree: 0.8, luxury: 0.98 },
    latitude: 25.0657,
    longitude: 55.1713,
    isActive: true
  },
  {
    id: 7,
    title: "Luxury Apartment in Downtown Dubai",
    price: "د.إ3,200,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Stunning apartment with Burj Khalifa views",
    tags: ["Apartment", "Luxury", "Downtown"],
    personas: { remoteWorker: 0.9, family: 0.7, investor: 0.9, retiree: 0.6, luxury: 0.95 },
    latitude: 25.1972,
    longitude: 55.2744,
    isActive: true
  },
  {
    id: 8,
    title: "Townhouse in Echo Park",
    price: "$950,000",
    location: "Echo Park, Los Angeles",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
    description: "Modern townhouse in trendy Echo Park",
    tags: ["Townhouse", "Modern", "Trendy"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.6, retiree: 0.4, luxury: 0.7 },
    latitude: 34.0535,
    longitude: -118.2420,
    isActive: true
  }
];

// Helper function to calculate distance
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// API functions that work client-side
export const api = {
  // Get all properties
  getProperties: (): Promise<PropertyWithScore[]> => Promise.resolve(properties),
  
  // Get properties by country
  getPropertiesByCountry: (country: string): Promise<PropertyWithScore[]> => {
    const countryProperties = properties.filter(p => 
      p.country?.toLowerCase() === country.toLowerCase()
    );
    return Promise.resolve(countryProperties);
  },
  
  // Search properties
  searchProperties: (query: { q?: string; country?: string }): Promise<PropertyWithScore[]> => {
    const { q, country } = query;
    let filtered = [...properties];
    
    if (q) {
      const searchTerm = q.toString().toLowerCase();
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.location?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (country) {
      filtered = filtered.filter(p => 
        p.country?.toLowerCase() === country.toString().toLowerCase()
      );
    }
    
    return Promise.resolve(filtered);
  },
  
  // Get property by ID
  getPropertyById: (id: number): Promise<PropertyWithScore | undefined> => {
    const property = properties.find(p => p.id === id);
    return Promise.resolve(property);
  },
  
  // Get properties by location
  getNearbyProperties: (lat: number, lng: number, radius: number = 10): Promise<PropertyWithScore[]> => {
    const userLat = parseFloat(lat.toString());
    const userLng = parseFloat(lng.toString());
    const searchRadius = parseFloat(radius.toString());
    
    const nearbyProperties = properties.filter(p => {
      if (!p.latitude || !p.longitude) return false;
      
      const distance = calculateDistance(userLat, userLng, p.latitude, p.longitude);
      return distance <= searchRadius;
    });
    
    // Sort by distance
    nearbyProperties.sort((a, b) => {
      const distA = calculateDistance(userLat, userLng, a.latitude, a.longitude);
      const distB = calculateDistance(userLat, userLng, b.latitude, b.longitude);
      return distA - distB;
    });
    
    return Promise.resolve(nearbyProperties);
  },
  
  // Get properties by persona
  getPropertiesByPersona: (persona: string): Promise<PropertyWithScore[]> => {
    const personaProperties = properties.filter(p => {
      if (!p.personas || !p.personas[persona as keyof typeof p.personas]) return false;
      return p.personas[persona as keyof typeof p.personas] >= 0.6;
    });
    
    // Sort by persona score
    personaProperties.sort((a, b) => {
      return (b.personas[persona as keyof typeof b.personas] || 0) - (a.personas[persona as keyof typeof a.personas] || 0);
    });
    
    return Promise.resolve(personaProperties);
  },
  
  // Get statistics
  getStats: (): Promise<{ total: number; byCountry: Record<string, number>; byType: Record<string, number> }> => {
    const stats = {
      total: properties.length,
      byCountry: properties.reduce((acc, p) => {
        const country = p.country || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byType: properties.reduce((acc, p) => {
        const type = p.tags?.[0] || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
    
    return Promise.resolve(stats);
  },
  
  // UAE Properties
  getUAEProperties: (): Promise<PropertyWithScore[]> => {
    const uaeProperties = properties.filter(p => p.country === "UAE");
    return Promise.resolve(uaeProperties);
  }
};
