import fs from 'fs';
import path from 'path';

let cyprusProperties = [];
try {
  const data = fs.readFileSync(path.join(process.cwd(), 'cyprus-properties.json'), 'utf-8');
  cyprusProperties = JSON.parse(data);
} catch (e) {
  console.error('Failed to load cyprus-properties.json:', e.message);
}

// Add the user's property as the first entry, with Lefkoşa (Nicosia) coordinates
cyprusProperties.push({
  latitude: 35.1856, // Lefkoşa (Nicosia) latitude
  longitude: 33.3823, // Lefkoşa (Nicosia) longitude
  title: 'For Rent Loft 3+1 Fully Furnished Duplex at Cyprus Girne Watergarden Residance',
  price: '£1,400 (~77,700₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/62671/448409/girne-dogankoy-kiralik-villa-448409-1748259805.1392.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/62671/448409/girne-dogankoy-kiralik-villa-448409-1748259805.1392.jpeg',
  location: 'Lefkoşa, Cyprus',
  contactUrl: '/property/cyprus-448409',
  lister_url: '/property/cyprus-448409',
  contactPhone: '',
  contactEmail: '',
  description: 'For Rent Loft 3+1 Fully Furnished Duplex at Cyprus Girne Watergarden Residance',
  tags: ['For Rent', 'Loft', '3+1', 'Fully Furnished', 'Duplex', 'Watergarden Residence'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1258, // Famagusta (Mağusa) latitude
  longitude: 33.9411, // Famagusta (Mağusa) longitude
  title: '2+1 Apartment In Stella Apartment, Fully Furnished At The Centre Of Famagusta In Gülseren District With A Some Sea View.',
  price: '£77,000 (~4,274,600₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/15561/446812/magusa-gulseren-satilik-daire-446812-1747721463.7998.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/15561/446812/magusa-gulseren-satilik-daire-446812-1747721463.7998.jpeg',
  location: 'Famagusta, Gülseren, Cyprus',
  contactUrl: '/property/cyprus-446812',
  lister_url: '/property/cyprus-446812',
  contactPhone: '',
  contactEmail: '',
  description: '2+1 Apartment In Stella Apartment, Fully Furnished At The Centre Of Famagusta In Gülseren District With A Some Sea View.',
  tags: ['For Sale', 'Apartment', '2+1', 'Fully Furnished', 'Sea View', 'Stella Apartment'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1224, // Mağusa Merkez (Famagusta) latitude
  longitude: 33.9389, // Mağusa Merkez (Famagusta) longitude
  title: 'Flat For Sale in Mağusa Merkez, Famagusta',
  price: '£65,000 (~3,581,800₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/549/418354/magusa-magusa-merkez-satilik-daire-418354-1737059975.8955.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/549/418354/magusa-magusa-merkez-satilik-daire-418354-1737059975.8955.jpeg',
  location: 'Mağusa Merkez, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-magusa-merkez-flat-418354.html#st',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-magusa-merkez-flat-418354.html#st',
  contactPhone: '',
  contactEmail: '',
  description: 'Flat For Sale in Mağusa Merkez, Famagusta',
  tags: ['For Sale', 'Flat', 'Mağusa Merkez', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1631, // Yeni Boğaziçi (Famagusta) latitude
  longitude: 33.8722, // Yeni Boğaziçi (Famagusta) longitude
  title: 'FAMAGUSTA - YENI BOGAZICI GARDENS PARK PROJECT 2+1 APARTMENT FOR SALE *** £115,000 GBP ***',
  price: '£115,000 (~6,384,100₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg',
  location: 'Yeni Boğaziçi, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-yeni-bogazici-flat-455998.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-yeni-bogazici-flat-455998.html',
  contactPhone: '',
  contactEmail: '',
  description: 'FAMAGUSTA - YENI BOGAZICI GARDENS PARK PROJECT 2+1 APARTMENT FOR SALE *** £115,000 GBP ***',
  tags: ['For Sale', 'Apartment', '2+1', 'Yeni Boğaziçi', 'Gardens Park Project', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1406, // Çanakkale (Famagusta) latitude
  longitude: 33.9111, // Çanakkale (Famagusta) longitude
  title: '3+1 Apartment for Sale in Gazimağusa Çanakkale from KIZILÖRS INVESTMENT',
  price: '£99,000 (~5,495,900₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/61083/450993/magusa-canakkale-satilik-daire-450993-1749541385.5429.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/61083/450993/magusa-canakkale-satilik-daire-450993-1749541385.5429.jpeg',
  location: 'Çanakkale, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-canakkale-flat-450993.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-canakkale-flat-450993.html',
  contactPhone: '',
  contactEmail: '',
  description: '3+1 Apartment for Sale in Gazimağusa Çanakkale from KIZILÖRS INVESTMENT',
  tags: ['For Sale', 'Apartment', '3+1', 'Çanakkale', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1224, // Gazimağusa (Famagusta) Center latitude
  longitude: 33.9389, // Gazimağusa (Famagusta) Center longitude
  title: '3+1 / 2+1 Apartments from the Project in Gazimağusa Center',
  price: '£85,000 (~4,718,700₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/7043/438008/magusa-magusa-merkez-satilik-daire-438008-1744286854.7364.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/7043/438008/magusa-magusa-merkez-satilik-daire-438008-1744286854.7364.jpeg',
  location: 'Gazimağusa Center, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-magusa-merkez-flat-438008.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-magusa-merkez-flat-438008.html',
  contactPhone: '',
  contactEmail: '',
  description: '3+1 / 2+1 Apartments from the Project in Gazimağusa Center',
  tags: ['For Sale', 'Apartment', '3+1', '2+1', 'Project', 'Gazimağusa Center', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1167, // Mutluyaka (Famagusta) latitude
  longitude: 33.8667, // Mutluyaka (Famagusta) longitude
  title: 'Semi Detached For Sale in Mutluyaka, Famagusta',
  price: '£168,000 (~9,326,400₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/1993/437563/magusa-mutluyaka-satilik-ikiz-villa-437563-1744120231.4985.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/1993/437563/magusa-mutluyaka-satilik-ikiz-villa-437563-1744120231.4985.jpeg',
  location: 'Mutluyaka, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-mutluyaka-semi-detached-437563.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-mutluyaka-semi-detached-437563.html',
  contactPhone: '',
  contactEmail: '',
  description: 'Semi Detached For Sale in Mutluyaka, Famagusta',
  tags: ['For Sale', 'Semi Detached', 'Mutluyaka', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.0667, // Beyarmudu (Famagusta) latitude
  longitude: 33.7333, // Beyarmudu (Famagusta) longitude
  title: 'BEYARMUDU .... TURKISH PRODUCT SINGLE STOREY HOUSE',
  price: '£110,000 (~6,106,500₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/11504/451673/magusa-beyarmudu-satilik-villa-451673-1749721789.5152.jpg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/11504/451673/magusa-beyarmudu-satilik-villa-451673-1749721789.5152.jpg',
  location: 'Beyarmudu, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-beyarmudu-detached-house-451673.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-beyarmudu-detached-house-451673.html',
  contactPhone: '',
  contactEmail: '',
  description: 'BEYARMUDU .... TURKISH PRODUCT SINGLE STOREY HOUSE',
  tags: ['For Sale', 'Single Storey', 'House', 'Beyarmudu', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1631, // Yeniboğaziçi (Famagusta) latitude
  longitude: 33.8722, // Yeniboğaziçi (Famagusta) longitude
  title: '2+1 Apartment for Sale in Yeniboğaziçi ORCHARD Site from Kızılörs Investment',
  price: '£165,000 (~9,159,800₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/61083/449831/magusa-yeni-bogazici-satilik-daire-449831-1748847219.3033.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/61083/449831/magusa-yeni-bogazici-satilik-daire-449831-1748847219.3033.jpeg',
  location: 'Yeniboğaziçi, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-yeni-bogazici-flat-449831.html#st',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-yeni-bogazici-flat-449831.html#st',
  contactPhone: '',
  contactEmail: '',
  description: '2+1 Apartment for Sale in Yeniboğaziçi ORCHARD Site from Kızılörs Investment',
  tags: ['For Sale', 'Apartment', '2+1', 'Yeniboğaziçi', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.1400, // Sakarya (Famagusta) latitude
  longitude: 33.9200, // Sakarya (Famagusta) longitude
  title: '2+1 Apartment for Sale in Terrace Park',
  price: '£138,000 (~7,661,000₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/62174/437954/magusa-sakarya-satilik-daire-437954-1744702119.157.jpeg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/62174/437954/magusa-sakarya-satilik-daire-437954-1744702119.157.jpeg',
  location: 'Sakarya, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-sakarya-flat-437954.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-sakarya-flat-437954.html',
  contactPhone: '',
  contactEmail: '',
  description: '2+1 Apartment for Sale in Terrace Park',
  tags: ['For Sale', 'Apartment', '2+1', 'Terrace Park', 'Sakarya', 'Famagusta'],
  personas: {},
  isActive: true,
});

cyprusProperties.push({
  latitude: 35.4131, // Tatlısu (Famagusta) latitude
  longitude: 33.7772, // Tatlısu (Famagusta) longitude
  title: 'For Sale 2+1 Apartment at Tatlısu Seaterra Reserve from KIZILÖRS INVESTMENT',
  price: '£98,000 (~5,440,400₺)',
  images: ['https://storage.googleapis.com/101evler-cache/property_wm/property/61083/451026/magusa-tatlisu-satilik-daire-451026-1749824788.783.jpg'],
  img_url: 'https://storage.googleapis.com/101evler-cache/property_wm/property/61083/451026/magusa-tatlisu-satilik-daire-451026-1749824788.783.jpg',
  location: 'Tatlısu, Famagusta, Cyprus',
  contactUrl: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-tatlisu-flat-451026.html',
  lister_url: 'https://www.101evler.com/north-cyprus/property-for-sale/famagusta-tatlisu-flat-451026.html',
  contactPhone: '',
  contactEmail: '',
  description: 'For Sale 2+1 Apartment at Tatlısu Seaterra Reserve from KIZILÖRS INVESTMENT',
  tags: ['For Sale', 'Apartment', '2+1', 'Tatlısu', 'Famagusta'],
  personas: {},
  isActive: true,
});

export default cyprusProperties; 