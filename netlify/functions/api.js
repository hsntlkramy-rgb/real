const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(require('cors')());
app.use(require('express').json());

// Mock data - no database needed, completely free!
const properties = [
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
  }
];

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
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

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all properties
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

// Get properties by country
app.get('/api/properties/:country', (req, res) => {
  const { country } = req.params;
  const countryProperties = properties.filter(p => 
    p.country?.toLowerCase() === country.toLowerCase()
  );
  
  if (countryProperties.length === 0) {
    return res.status(404).json({ error: `No properties found for ${country}` });
  }
  
  res.json(countryProperties);
});

// Search properties
app.get('/api/search', (req, res) => {
  const { q, country, minPrice, maxPrice, propertyType, bedrooms } = req.query;
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
  
  res.json(filtered);
});

// Get property by ID
app.get('/api/properties/id/:id', (req, res) => {
  const { id } = req.params;
  const property = properties.find(p => p.id.toString() === id);
  
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  
  res.json(property);
});

// Get properties by location (coordinates)
app.get('/api/properties/nearby', (req, res) => {
  const { lat, lng, radius = 10 } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  
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
  
  res.json(nearbyProperties);
});

// Get properties by persona
app.get('/api/properties/persona/:persona', (req, res) => {
  const { persona } = req.params;
  
  const personaProperties = properties.filter(p => {
    if (!p.personas || !p.personas[persona]) return false;
    return p.personas[persona] >= 0.6; // Threshold for good match
  });
  
  // Sort by persona score
  personaProperties.sort((a, b) => {
    return (b.personas[persona] || 0) - (a.personas[persona] || 0);
  });
  
  res.json(personaProperties);
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    total: properties.length,
    byCountry: properties.reduce((acc, p) => {
      const country = p.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {}),
    byType: properties.reduce((acc, p) => {
      const type = p.tags?.[0] || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {})
  };
  
  res.json(stats);
});

// UAE Properties API (using free external API)
app.get('/api/uae-properties', async (req, res) => {
  try {
    // Using a free mock API instead of paid RapidAPI
    const mockUAEProperties = [
      {
        id: 1001,
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
        id: 1002,
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
      }
    ];
    
    res.json(mockUAEProperties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch UAE properties' });
  }
});

// Export the serverless function
module.exports.handler = serverless(app);
