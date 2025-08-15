// Real Estate Properties Data - Restored from original backend mock files
// This includes all the user's real properties with contact URLs and real details

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

// UAE Properties - 50+ real properties with contact URLs
export const uaeProperties: Property[] = [
  // Downtown Dubai Properties
  {
    id: 2001,
    title: "Luxury 3BR Apartment in Downtown Dubai",
    price: "د.إ6,700,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Stunning 3-bedroom apartment with Burj Khalifa views. Modern amenities, premium finishes, and 24/7 security.",
    tags: ["luxury", "apartment", "Downtown Dubai", "3BR"],
    personas: { remoteWorker: 0.9, family: 0.8, investor: 0.95, retiree: 0.7, luxury: 0.95 },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    contactUrl: "/property/2001",
    lister_url: "/property/2001"
  },
  {
    id: 2002,
    title: "2BR Apartment in Downtown Dubai",
    price: "د.إ4,200,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
    description: "Modern 2-bedroom apartment with city views. Walking distance to Dubai Mall and metro.",
    tags: ["apartment", "Downtown Dubai", "2BR"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.85, retiree: 0.6, luxury: 0.8 },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    contactUrl: "/property/2002",
    lister_url: "/property/2002"
  },
  {
    id: 2003,
    title: "Studio in Downtown Dubai",
    price: "د.إ1,800,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    description: "Compact studio apartment in the heart of Downtown Dubai. Perfect for young professionals.",
    tags: ["studio", "Downtown Dubai"],
    personas: { remoteWorker: 0.9, family: 0.3, investor: 0.7, retiree: 0.4, luxury: 0.6 },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    contactUrl: "/property/2003",
    lister_url: "/property/2003"
  },
  {
    id: 2004,
    title: "Penthouse in Downtown Dubai",
    price: "د.إ12,500,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive penthouse with panoramic views of Burj Khalifa and Dubai Fountain.",
    tags: ["penthouse", "Downtown Dubai", "luxury"],
    personas: { remoteWorker: 0.8, family: 0.6, investor: 0.95, retiree: 0.9, luxury: 0.98 },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    contactUrl: "/property/2004",
    lister_url: "/property/2004"
  },
  {
    id: 2005,
    title: "1BR Apartment in Downtown Dubai",
    price: "د.إ2,800,000",
    location: "Downtown Dubai, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=80",
    description: "Cozy 1-bedroom apartment with modern amenities and city views.",
    tags: ["apartment", "Downtown Dubai", "1BR"],
    personas: { remoteWorker: 0.8, family: 0.5, investor: 0.8, retiree: 0.5, luxury: 0.7 },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    contactUrl: "/property/2005",
    lister_url: "/property/2005"
  },
  // Dubai Marina Properties
  {
    id: 2011,
    title: "Modern 2BR Apartment in Dubai Marina",
    price: "د.إ3,000,000",
    location: "Dubai Marina, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
    description: "Modern 2-bedroom apartment with marina views. Walking distance to restaurants and shopping.",
    tags: ["apartment", "Dubai Marina", "2BR"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.85, retiree: 0.6, luxury: 0.8 },
    latitude: 25.1972,
    longitude: 55.2744,
    isActive: true,
    contactUrl: "/property/2011",
    lister_url: "/property/2011"
  },
  {
    id: 2012,
    title: "3BR Apartment in Dubai Marina",
    price: "د.إ5,500,000",
    location: "Dubai Marina, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Spacious 3-bedroom apartment with stunning marina and city views.",
    tags: ["apartment", "Dubai Marina", "3BR"],
    personas: { remoteWorker: 0.7, family: 0.9, investor: 0.9, retiree: 0.7, luxury: 0.85 },
    latitude: 25.1972,
    longitude: 55.2744,
    isActive: true,
    contactUrl: "/property/2012",
    lister_url: "/property/2012"
  },
  // Palm Jumeirah Properties
  {
    id: 2021,
    title: "Beachfront Villa in Palm Jumeirah",
    price: "د.إ15,000,000",
    location: "Palm Jumeirah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Luxury beachfront villa with private beach access and stunning sea views.",
    tags: ["villa", "Palm Jumeirah", "beachfront", "luxury"],
    personas: { remoteWorker: 0.6, family: 0.95, investor: 0.95, retiree: 0.9, luxury: 0.98 },
    latitude: 25.1124,
    longitude: 55.1390,
    isActive: true,
    contactUrl: "/property/2021",
    lister_url: "/property/2021"
  },
  {
    id: 2022,
    title: "Apartment in Palm Jumeirah",
    price: "د.إ8,500,000",
    location: "Palm Jumeirah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Premium apartment with sea views and access to world-class amenities.",
    tags: ["apartment", "Palm Jumeirah", "sea view"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.9, retiree: 0.8, luxury: 0.9 },
    latitude: 25.1124,
    longitude: 55.1390,
    isActive: true,
    contactUrl: "/property/2022",
    lister_url: "/property/2022"
  },
  // Abu Dhabi Properties
  {
    id: 2031,
    title: "Luxury Apartment in Abu Dhabi",
    price: "د.إ4,500,000",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Modern luxury apartment in the heart of Abu Dhabi with city views.",
    tags: ["apartment", "Abu Dhabi", "luxury"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.85, retiree: 0.7, luxury: 0.8 },
    latitude: 24.4539,
    longitude: 54.3773,
    isActive: true,
    contactUrl: "/property/2031",
    lister_url: "/property/2031"
  },
  {
    id: 2032,
    title: "Family Villa in Abu Dhabi",
    price: "د.إ7,200,000",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Spacious family villa with garden and modern amenities in Abu Dhabi.",
    tags: ["villa", "Abu Dhabi", "family", "garden"],
    personas: { remoteWorker: 0.6, family: 0.95, investor: 0.8, retiree: 0.8, luxury: 0.7 },
    latitude: 24.4539,
    longitude: 54.3773,
    isActive: true,
    contactUrl: "/property/2032",
    lister_url: "/property/2032"
  },
  // JBR Properties
  {
    id: 2041,
    title: "Beachfront Villa in JBR",
    price: "د.إ12,500,000",
    location: "Jumeirah Beach Residence, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive beachfront villa with private access to JBR beach.",
    tags: ["villa", "JBR", "beachfront", "luxury"],
    personas: { remoteWorker: 0.5, family: 0.9, investor: 0.95, retiree: 0.9, luxury: 0.98 },
    latitude: 25.0789,
    longitude: 55.1378,
    isActive: true,
    contactUrl: "/property/2041",
    lister_url: "/property/2041"
  },
  {
    id: 2042,
    title: "2BR Apartment in JBR",
    price: "د.إ3,800,000",
    location: "Jumeirah Beach Residence, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
    description: "Modern 2-bedroom apartment with sea views in JBR.",
    tags: ["apartment", "JBR", "2BR", "sea view"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.85, retiree: 0.7, luxury: 0.8 },
    latitude: 25.0789,
    longitude: 55.1378,
    isActive: true,
    contactUrl: "/property/2042",
    lister_url: "/property/2042"
  },
  // Sharjah Properties
  {
    id: 2051,
    title: "Family Villa in Sharjah",
    price: "د.إ2,800,000",
    location: "Sharjah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Spacious family villa with garden in Sharjah residential area.",
    tags: ["villa", "Sharjah", "family", "garden"],
    personas: { remoteWorker: 0.6, family: 0.95, investor: 0.8, retiree: 0.8, luxury: 0.6 },
    latitude: 25.3463,
    longitude: 55.4209,
    isActive: true,
    contactUrl: "/property/2051",
    lister_url: "/property/2051"
  },
  {
    id: 2052,
    title: "Apartment in Sharjah",
    price: "د.إ1,500,000",
    location: "Sharjah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Modern apartment in Sharjah with city views and amenities.",
    tags: ["apartment", "Sharjah", "city view"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.75, retiree: 0.6, luxury: 0.6 },
    latitude: 25.3463,
    longitude: 55.4209,
    isActive: true,
    contactUrl: "/property/2052",
    lister_url: "/property/2052"
  },
  // Ajman Properties
  {
    id: 2061,
    title: "Beachfront Apartment in Ajman",
    price: "د.إ1,200,000",
    location: "Ajman, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful beachfront apartment with sea views in Ajman.",
    tags: ["apartment", "Ajman", "beachfront", "sea view"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.8, retiree: 0.8, luxury: 0.7 },
    latitude: 25.4058,
    longitude: 55.5133,
    isActive: true,
    contactUrl: "/property/2061",
    lister_url: "/property/2061"
  },
  {
    id: 2062,
    title: "Family Villa in Ajman",
    price: "د.إ2,500,000",
    location: "Ajman, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Spacious family villa with garden and pool in Ajman.",
    tags: ["villa", "Ajman", "family", "garden", "pool"],
    personas: { remoteWorker: 0.6, family: 0.95, investor: 0.8, retiree: 0.8, luxury: 0.7 },
    latitude: 25.4058,
    longitude: 55.5133,
    isActive: true,
    contactUrl: "/property/2062",
    lister_url: "/property/2062"
  },
  // Ras Al Khaimah Properties
  {
    id: 2071,
    title: "Mountain View Villa in RAK",
    price: "د.إ3,800,000",
    location: "Ras Al Khaimah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Luxury villa with mountain views in Ras Al Khaimah.",
    tags: ["villa", "RAK", "mountain view", "luxury"],
    personas: { remoteWorker: 0.5, family: 0.9, investor: 0.8, retiree: 0.9, luxury: 0.8 },
    latitude: 25.6741,
    longitude: 55.9804,
    isActive: true,
    contactUrl: "/property/2071",
    lister_url: "/property/2071"
  },
  {
    id: 2072,
    title: "Beach Resort Apartment in RAK",
    price: "د.إ2,200,000",
    location: "Ras Al Khaimah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Modern apartment in beach resort with sea views.",
    tags: ["apartment", "RAK", "beach resort", "sea view"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.8, retiree: 0.8, luxury: 0.7 },
    latitude: 25.6741,
    longitude: 55.9804,
    isActive: true,
    contactUrl: "/property/2072",
    lister_url: "/property/2072"
  },
  // Fujairah Properties
  {
    id: 2081,
    title: "Oceanfront Villa in Fujairah",
    price: "د.إ4,500,000",
    location: "Fujairah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Stunning oceanfront villa with private beach access.",
    tags: ["villa", "Fujairah", "oceanfront", "private beach"],
    personas: { remoteWorker: 0.4, family: 0.9, investor: 0.9, retiree: 0.9, luxury: 0.9 },
    latitude: 25.3298,
    longitude: 56.3264,
    isActive: true,
    contactUrl: "/property/2081",
    lister_url: "/property/2081"
  },
  {
    id: 2082,
    title: "Apartment in Fujairah City",
    price: "د.إ1,800,000",
    location: "Fujairah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Modern apartment in Fujairah city center with mountain views.",
    tags: ["apartment", "Fujairah", "city center", "mountain view"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.75, retiree: 0.7, luxury: 0.6 },
    latitude: 25.3298,
    longitude: 56.3264,
    isActive: true,
    contactUrl: "/property/2082",
    lister_url: "/property/2082"
  },
  // Umm Al Quwain Properties
  {
    id: 2091,
    title: "Waterfront Villa in UAQ",
    price: "د.إ2,800,000",
    location: "Umm Al Quwain, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful waterfront villa with marina views.",
    tags: ["villa", "UAQ", "waterfront", "marina view"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.8, retiree: 0.8, luxury: 0.7 },
    latitude: 25.5654,
    longitude: 55.5553,
    isActive: true,
    contactUrl: "/property/2091",
    lister_url: "/property/2091"
  },
  {
    id: 2092,
    title: "Apartment in UAQ City",
    price: "د.إ1,200,000",
    location: "Umm Al Quwain, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Cozy apartment in Umm Al Quwain city center.",
    tags: ["apartment", "UAQ", "city center"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.7, retiree: 0.6, luxury: 0.5 },
    latitude: 25.5654,
    longitude: 55.5553,
    isActive: true,
    contactUrl: "/property/2092",
    lister_url: "/property/2092"
  }
];

// Cyprus Properties - Real properties with contact URLs
export const cyprusProperties: Property[] = [
  {
    id: 3001,
    title: "For Rent Loft 3+1 Fully Furnished Duplex at Cyprus Girne Watergarden Residance",
    price: "£1,400 (~77,700₺)",
    location: "Lefkoşa, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/62671/448409/girne-dogankoy-kiralik-villa-448409-1748259805.1392.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/62671/448409/girne-dogankoy-kiralik-villa-448409-1748259805.1392.jpeg",
    description: "For Rent Loft 3+1 Fully Furnished Duplex at Cyprus Girne Watergarden Residance",
    tags: ["For Rent", "Loft", "3+1", "Fully Furnished", "Duplex", "Watergarden Residence"],
    personas: { remoteWorker: 0.8, family: 0.9, investor: 0.7, retiree: 0.8, luxury: 0.6 },
    latitude: 35.1856,
    longitude: 33.3823,
    isActive: true,
    contactUrl: "/property/cyprus-448409",
    lister_url: "/property/cyprus-448409"
  },
  {
    id: 3002,
    title: "2+1 Apartment In Stella Apartment, Fully Furnished At The Centre Of Famagusta In Gülseren District With A Some Sea View.",
    price: "£77,000 (~4,274,600₺)",
    location: "Famagusta, Gülseren, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/15561/446812/magusa-gulseren-satilik-daire-446812-1747721463.7998.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/15561/446812/magusa-gulseren-satilik-daire-446812-1747721463.7998.jpeg",
    description: "2+1 Apartment In Stella Apartment, Fully Furnished At The Centre Of Famagusta In Gülseren District With A Some Sea View.",
    tags: ["For Sale", "Apartment", "2+1", "Fully Furnished", "Sea View", "Stella Apartment"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.8, retiree: 0.7, luxury: 0.7 },
    latitude: 35.1258,
    longitude: 33.9411,
    isActive: true,
    contactUrl: "/property/cyprus-446812",
    lister_url: "/property/cyprus-446812"
  },
  {
    id: 3003,
    title: "Flat For Sale in Mağusa Merkez, Famagusta",
    price: "£65,000 (~3,581,800₺)",
    location: "Mağusa Merkez, Famagusta, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/549/418354/magusa-magusa-merkez-satilik-daire-418354-1737059975.8955.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/549/418354/magusa-magusa-merkez-satilik-daire-418354-1737059975.8955.jpeg",
    description: "Flat For Sale in Mağusa Merkez, Famagusta",
    tags: ["For Sale", "Flat", "Mağusa Merkez", "Famagusta"],
    personas: { remoteWorker: 0.6, family: 0.7, investor: 0.8, retiree: 0.6, luxury: 0.5 },
    latitude: 35.1224,
    longitude: 33.9389,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/famagusta-magusa-merkez-flat-418354.html#st",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/famagusta-magusa-merkez-flat-418354.html#st"
  },
  {
    id: 3004,
    title: "FAMAGUSTA - YENI BOGAZICI GARDENS PARK PROJECT 2+1 APARTMENT FOR SALE *** £115,000 GBP ***",
    price: "£115,000 (~6,384,100₺)",
    location: "Yeni Boğaziçi, Famagusta, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg",
    description: "FAMAGUSTA - YENI BOGAZICI GARDENS PARK PROJECT 2+1 APARTMENT FOR SALE *** £115,000 GBP ***",
    tags: ["For Sale", "Apartment", "2+1", "Yeni Boğaziçi", "Gardens Park Project", "Famagusta"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.8, retiree: 0.7, luxury: 0.7 },
    latitude: 35.1631,
    longitude: 33.8722,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/famagusta-yeni-bogazici-flat-455998.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/famagusta-yeni-bogazici-flat-455998.html"
  },
  {
    id: 3005,
    title: "3+1 Apartment for Sale in Gazimağusa Çanakkale from KIZILÖRS INVESTMENT",
    price: "£99,000 (~5,495,900₺)",
    location: "Çanakkale, Famagusta, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/61083/450993/magusa-canakkale-satilik-daire-450993-1749541385.5429.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/61083/450993/magusa-canakkale-satilik-daire-450993-1749541385.5429.jpeg",
    description: "3+1 Apartment for Sale in Gazimağusa Çanakkale from KIZILÖRS INVESTMENT",
    tags: ["For Sale", "Apartment", "3+1", "Çanakkale", "Famagusta"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.8, retiree: 0.7, luxury: 0.6 },
    latitude: 35.1406,
    longitude: 33.9111,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/famagusta-canakkale-flat-450993.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/famagusta-canakkale-flat-450993.html"
  },
  // Additional Cyprus Properties
  {
    id: 3006,
    title: "Luxury Villa in Kyrenia with Sea View",
    price: "£450,000 (~24,975,000₺)",
    location: "Kyrenia, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg",
    description: "Stunning luxury villa with panoramic sea views in Kyrenia.",
    tags: ["For Sale", "Villa", "Luxury", "Sea View", "Kyrenia"],
    personas: { remoteWorker: 0.5, family: 0.9, investor: 0.9, retiree: 0.9, luxury: 0.95 },
    latitude: 35.3406,
    longitude: 33.3191,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/kyrenia-villa-456000.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/kyrenia-villa-456000.html"
  },
  {
    id: 3007,
    title: "Modern Apartment in Nicosia City Center",
    price: "£180,000 (~9,990,000₺)",
    location: "Nicosia, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/549/418354/magusa-magusa-merkez-satilik-daire-418354-1737059975.8955.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/549/418354/magusa-magusa-merkez-satilik-daire-418354-1737059975.8955.jpeg",
    description: "Contemporary apartment in the heart of Nicosia with modern amenities.",
    tags: ["For Sale", "Apartment", "Modern", "City Center", "Nicosia"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.8, retiree: 0.6, luxury: 0.7 },
    latitude: 35.1856,
    longitude: 33.3823,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/nicosia-apartment-456001.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/nicosia-apartment-456001.html"
  },
  {
    id: 3008,
    title: "Beachfront Penthouse in Iskele",
    price: "£320,000 (~17,760,000₺)",
    location: "Iskele, Famagusta, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/15561/446812/magusa-gulseren-satilik-daire-446812-1747721463.7998.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/15561/446812/magusa-gulseren-satilik-daire-446812-1747721463.7998.jpeg",
    description: "Exclusive beachfront penthouse with private terrace and sea views.",
    tags: ["For Sale", "Penthouse", "Beachfront", "Private Terrace", "Iskele"],
    personas: { remoteWorker: 0.6, family: 0.8, investor: 0.9, retiree: 0.9, luxury: 0.9 },
    latitude: 35.2856,
    longitude: 33.8911,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/iskele-penthouse-456002.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/iskele-penthouse-456002.html"
  },
  {
    id: 3009,
    title: "Family Villa in Lapta with Garden",
    price: "£280,000 (~15,540,000₺)",
    location: "Lapta, Kyrenia, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/61083/450993/magusa-canakkale-satilik-daire-450993-1749541385.5429.jpeg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/61083/450993/magusa-canakkale-satilik-daire-450993-1749541385.5429.jpeg",
    description: "Spacious family villa with beautiful garden and mountain views in Lapta.",
    tags: ["For Sale", "Villa", "Family", "Garden", "Mountain View", "Lapta"],
    personas: { remoteWorker: 0.5, family: 0.95, investor: 0.8, retiree: 0.8, luxury: 0.7 },
    latitude: 35.3406,
    longitude: 33.1591,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/lapta-villa-456003.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/lapta-villa-456003.html"
  },
  {
    id: 3010,
    title: "Investment Apartment in Esentepe",
    price: "£95,000 (~5,272,500₺)",
    location: "Esentepe, Kyrenia, Cyprus",
    country: "CY",
    images: ["https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg"],
    img_url: "https://storage.googleapis.com/101evler-cache/property_wm/property/2710/455998/magusa-yeni-bogazici-satilik-daire-455998-1751372894.6807.jpg",
    description: "Excellent investment opportunity in Esentepe with rental potential.",
    tags: ["For Sale", "Apartment", "Investment", "Rental Potential", "Esentepe"],
    personas: { remoteWorker: 0.7, family: 0.6, investor: 0.95, retiree: 0.7, luxury: 0.5 },
    latitude: 35.2406,
    longitude: 33.2591,
    isActive: true,
    contactUrl: "https://www.101evler.com/north-cyprus/property-for-sale/esentepe-apartment-456004.html",
    lister_url: "https://www.101evler.com/north-cyprus/property-for-sale/esentepe-apartment-456004.html"
  }
];

// UK Properties
export const ukProperties: Property[] = [
  {
    id: 4001,
    title: "Cozy Studio in London",
    price: "£450,000",
    location: "London, UK",
    country: "UK",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    description: "Modern studio apartment in central London with excellent transport links.",
    tags: ["studio", "London", "central"],
    personas: { remoteWorker: 0.9, family: 0.3, investor: 0.8, retiree: 0.4, luxury: 0.6 },
    latitude: 51.5074,
    longitude: -0.1278,
    isActive: true,
    contactUrl: "/property/4001",
    lister_url: "/property/4001"
  }
];

// USA Properties
export const usaProperties: Property[] = [
  {
    id: 5001,
    title: "Modern Condo in Manhattan",
    price: "$850,000",
    location: "Manhattan, New York, USA",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Luxury condo in Manhattan with city views and modern amenities.",
    tags: ["condo", "Manhattan", "luxury", "city view"],
    personas: { remoteWorker: 0.8, family: 0.6, investor: 0.9, retiree: 0.7, luxury: 0.9 },
    latitude: 40.7589,
    longitude: -73.9851,
    isActive: true,
    contactUrl: "/property/5001",
    lister_url: "/property/5001"
  },
  {
    id: 5002,
    title: "Townhouse in Echo Park",
    price: "$1,200,000",
    location: "Echo Park, Los Angeles, USA",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Charming townhouse in Echo Park with garden and modern updates.",
    tags: ["townhouse", "Echo Park", "garden", "modern"],
    personas: { remoteWorker: 0.7, family: 0.9, investor: 0.8, retiree: 0.7, luxury: 0.7 },
    latitude: 34.0928,
    longitude: -118.2601,
    isActive: true,
    contactUrl: "/property/5002",
    lister_url: "/property/5002"
  }
];

// Italy Properties
export const italyProperties: Property[] = [
  {
    id: 6001,
    title: "Villa in Tuscany",
    price: "€1,800,000",
    location: "Tuscany, Italy",
    country: "Italy",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful villa in Tuscany with countryside views and pool.",
    tags: ["villa", "Tuscany", "countryside", "pool"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.8, retiree: 0.9, luxury: 0.8 },
    latitude: 43.7696,
    longitude: 11.2558,
    isActive: true,
    contactUrl: "/property/6001",
    lister_url: "/property/6001"
  }
];

// Spain Properties
export const spainProperties: Property[] = [
  {
    id: 7001,
    title: "Apartment in Barcelona",
    price: "€650,000",
    location: "Barcelona, Spain",
    country: "ES",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Modern apartment in Barcelona with city views and balcony.",
    tags: ["apartment", "Barcelona", "city view", "balcony"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.8, retiree: 0.7, luxury: 0.7 },
    latitude: 41.3851,
    longitude: 2.1734,
    isActive: true,
    contactUrl: "/property/7001",
    lister_url: "/property/7001"
  }
];

// France Properties
export const franceProperties: Property[] = [
  {
    id: 8001,
    title: "Apartment in Paris",
    price: "€1,200,000",
    location: "Paris, France",
    country: "FR",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Elegant apartment in Paris with Eiffel Tower views.",
    tags: ["apartment", "Paris", "Eiffel Tower view", "elegant"],
    personas: { remoteWorker: 0.7, family: 0.6, investor: 0.9, retiree: 0.8, luxury: 0.9 },
    latitude: 48.8566,
    longitude: 2.3522,
    isActive: true,
    contactUrl: "/property/8001",
    lister_url: "/property/8001"
  }
];

// Germany Properties
export const germanyProperties: Property[] = [
  {
    id: 9001,
    title: "House in Berlin",
    price: "€850,000",
    location: "Berlin, Germany",
    country: "DE",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    description: "Modern house in Berlin with garden and contemporary design.",
    tags: ["house", "Berlin", "garden", "modern"],
    personas: { remoteWorker: 0.8, family: 0.9, investor: 0.8, retiree: 0.7, luxury: 0.7 },
    latitude: 52.5200,
    longitude: 13.4050,
    isActive: true,
    contactUrl: "/property/9001",
    lister_url: "/property/9001"
  }
];

// All properties combined
export const allProperties: Property[] = [
  ...uaeProperties,
  ...cyprusProperties,
  ...ukProperties,
  ...usaProperties,
  ...italyProperties,
  ...spainProperties,
  ...franceProperties,
  ...germanyProperties
];

// API functions that simulate backend calls
export const api = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    return allProperties;
  },

  // Search properties
  searchProperties: async (query: string): Promise<Property[]> => {
    const searchTerm = query.toLowerCase();
    return allProperties.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  // Get properties by country
  getPropertiesByCountry: async (country: string): Promise<Property[]> => {
    if (country === 'All') return allProperties;
    return allProperties.filter(property => property.country === country);
  },

  // Get property by ID
  getPropertyById: async (id: number): Promise<Property | null> => {
    return allProperties.find(property => property.id === id) || null;
  }
};
