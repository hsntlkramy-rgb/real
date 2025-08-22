import fs from 'fs';
import path from 'path';

let cyprusProperties = [];
try {
  const data = fs.readFileSync(path.join(process.cwd(), 'cyprus-properties.json'), 'utf-8');
  const jsonProperties = JSON.parse(data);
  
  // Convert JSON properties to the format expected by the application
  cyprusProperties = jsonProperties.map((property, index) => ({
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
  
  console.log(`Loaded ${cyprusProperties.length} real Cyprus properties from JSON file`);
} catch (e) {
  console.error('Failed to load cyprus-properties.json:', e.message);
  // Fallback to empty array if file can't be loaded
  cyprusProperties = [];
}

export default cyprusProperties; 