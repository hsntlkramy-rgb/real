import fs from 'fs';

const locations = [
  { name: 'Downtown Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Dubai Marina', lat: 25.1972, lng: 55.2744 },
  { name: 'Palm Jumeirah', lat: 25.0657, lng: 55.1713 },
  { name: 'JLT', lat: 25.0657, lng: 55.1713 },
  { name: 'Business Bay', lat: 25.1972, lng: 55.2744 },
  { name: 'Emirates Hills', lat: 25.0657, lng: 55.1713 },
  { name: 'Arabian Ranches', lat: 25.0657, lng: 55.1713 },
  { name: 'Dubai Silicon Oasis', lat: 25.0657, lng: 55.1713 },
  { name: 'Abu Dhabi Corniche', lat: 24.4539, lng: 54.3773 },
  { name: 'Saadiyat Island', lat: 24.4539, lng: 54.3773 },
  { name: 'Yas Island', lat: 24.4539, lng: 54.3773 },
  { name: 'Al Reem Island', lat: 24.4539, lng: 54.3773 },
  { name: 'Sharjah', lat: 25.3463, lng: 55.4209 },
  { name: 'Ajman', lat: 25.4052, lng: 55.5136 },
  { name: 'Ras Al Khaimah', lat: 25.6741, lng: 55.9804 }
];

const propertyTypes = [
  { type: 'Studio', minPrice: 300000, maxPrice: 800000 },
  { type: '1BR Apartment', minPrice: 500000, maxPrice: 1200000 },
  { type: '2BR Apartment', minPrice: 800000, maxPrice: 2500000 },
  { type: '3BR Apartment', minPrice: 1200000, maxPrice: 4000000 },
  { type: 'Penthouse', minPrice: 2000000, maxPrice: 8000000 },
  { type: 'Villa', minPrice: 1500000, maxPrice: 6000000 },
  { type: 'Luxury Villa', minPrice: 3000000, maxPrice: 12000000 }
];

let output = '';

for (let i = 21; i <= 250; i++) {
  const location = locations[i % locations.length];
  const propertyType = propertyTypes[i % propertyTypes.length];
  const price = Math.floor(Math.random() * (propertyType.maxPrice - propertyType.minPrice) + propertyType.minPrice);
  const lat = location.lat + (Math.random() - 0.5) * 0.1;
  const lng = location.lng + (Math.random() - 0.5) * 0.1;
  
  output += `  {\n`;
  output += `    id: ${2000 + i},\n`;
  output += `    latitude: ${lat.toFixed(4)},\n`;
  output += `    longitude: ${lng.toFixed(4)},\n`;
  output += `    title: '${propertyType.type} in ${location.name}',\n`;
  output += `    price: 'د.إ${price.toLocaleString()}',\n`;
  output += `    images: ['https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&w=400&q=80'],\n`;
  output += `    img_url: 'https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&w=400&q=80',\n`;
  output += `    location: '${location.name}, UAE',\n`;
  output += `    contactUrl: 'https://www.bayut.com/property/details-${100000 + i}.html',\n`;
  output += `    lister_url: 'https://www.bayut.com/property/details-${100000 + i}.html',\n`;
  output += `    description: 'Beautiful ${propertyType.type.toLowerCase()} in ${location.name}. Modern amenities and great location.',\n`;
  output += `    tags: ['${propertyType.type.split(' ')[0].toLowerCase()}', '${location.name.split(' ')[0].toLowerCase()}'],\n`;
  output += `    personas: {\n`;
  output += `      remoteWorker: ${(Math.random() * 0.5 + 0.3).toFixed(1)},\n`;
  output += `      family: ${(Math.random() * 0.5 + 0.4).toFixed(1)},\n`;
  output += `      investor: ${(Math.random() * 0.5 + 0.5).toFixed(1)},\n`;
  output += `      retiree: ${(Math.random() * 0.5 + 0.3).toFixed(1)},\n`;
  output += `      luxury: ${price > 3000000 ? (Math.random() * 0.3 + 0.7).toFixed(1) : (Math.random() * 0.5 + 0.2).toFixed(1)}\n`;
  output += `    },\n`;
  output += `    isActive: true\n`;
  output += `  }${i < 250 ? ',' : ''}\n`;
}

fs.writeFileSync('temp_properties.txt', output);
console.log('Generated properties saved to temp_properties.txt'); 