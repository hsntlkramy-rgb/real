// Script to generate 250 UAE properties
const uaeProperties = [];

const locations = [
  { name: "Downtown Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Dubai Marina", lat: 25.1972, lng: 55.2744 },
  { name: "Palm Jumeirah", lat: 25.0657, lng: 55.1713 },
  { name: "JLT", lat: 25.0657, lng: 55.1713 },
  { name: "Business Bay", lat: 25.1972, lng: 55.2744 },
  { name: "Emirates Hills", lat: 25.0657, lng: 55.1713 },
  { name: "Arabian Ranches", lat: 25.0657, lng: 55.1713 },
  { name: "Dubai Silicon Oasis", lat: 25.0657, lng: 55.1713 },
  { name: "Abu Dhabi Corniche", lat: 24.4539, lng: 54.3773 },
  { name: "Saadiyat Island", lat: 24.4539, lng: 54.3773 },
  { name: "Yas Island", lat: 24.4539, lng: 54.3773 },
  { name: "Al Reem Island", lat: 24.4539, lng: 54.3773 },
  { name: "Sharjah", lat: 25.3463, lng: 55.4209 },
  { name: "Ajman", lat: 25.4052, lng: 55.5136 },
  { name: "Ras Al Khaimah", lat: 25.6741, lng: 55.9804 }
];

const propertyTypes = [
  { type: "Studio", minPrice: 300000, maxPrice: 800000, tags: ["studio", "affordable"] },
  { type: "1BR Apartment", minPrice: 500000, maxPrice: 1200000, tags: ["1BR", "apartment"] },
  { type: "2BR Apartment", minPrice: 800000, maxPrice: 2500000, tags: ["2BR", "apartment"] },
  { type: "3BR Apartment", minPrice: 1200000, maxPrice: 4000000, tags: ["3BR", "apartment"] },
  { type: "Penthouse", minPrice: 2000000, maxPrice: 8000000, tags: ["penthouse", "luxury"] },
  { type: "Townhouse", minPrice: 1000000, maxPrice: 3000000, tags: ["townhouse"] },
  { type: "Villa", minPrice: 1500000, maxPrice: 6000000, tags: ["villa"] },
  { type: "Luxury Villa", minPrice: 3000000, maxPrice: 12000000, tags: ["villa", "luxury"] }
];

const amenities = [
  "Pool", "Gym", "Garden", "Balcony", "Parking", "Security", "Concierge", 
  "Beach Access", "Golf Course", "Marina View", "City View", "Sea View"
];

function generateProperty(id) {
  const location = locations[Math.floor(Math.random() * locations.length)];
  const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const price = Math.floor(Math.random() * (propertyType.maxPrice - propertyType.minPrice) + propertyType.minPrice);
  
  const title = `${propertyType.type} in ${location.name}`;
  const priceFormatted = `د.إ${price.toLocaleString()}`;
  
  return {
    id: 2000 + id,
    latitude: location.lat + (Math.random() - 0.5) * 0.1,
    longitude: location.lng + (Math.random() - 0.5) * 0.1,
    title: title,
    price: priceFormatted,
    images: [`https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&w=400&q=80`],
    img_url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&w=400&q=80`,
    location: `${location.name}, UAE`,
    contactUrl: `https://www.bayut.com/property/details-${100000 + id}.html`,
    lister_url: `https://www.bayut.com/property/details-${100000 + id}.html`,
    description: `Beautiful ${propertyType.type.toLowerCase()} in ${location.name}. ${amenities.slice(0, 3).join(', ')} included.`,
    tags: [...propertyType.tags, location.name.split(' ')[0]],
    personas: {
      remoteWorker: Math.random() * 0.5 + 0.3,
      family: Math.random() * 0.5 + 0.4,
      investor: Math.random() * 0.5 + 0.5,
      retiree: Math.random() * 0.5 + 0.3,
      luxury: price > 3000000 ? Math.random() * 0.3 + 0.7 : Math.random() * 0.5 + 0.2
    },
    isActive: true
  };
}

// Generate 250 properties
for (let i = 1; i <= 250; i++) {
  uaeProperties.push(generateProperty(i));
}

console.log(JSON.stringify(uaeProperties, null, 2)); 