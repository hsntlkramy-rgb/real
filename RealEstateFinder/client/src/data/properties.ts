import { PropertyWithScore } from '@/lib/types';

// Client-side property data - no backend needed! INSTANT LOADING!
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
  },
  // NEW PROPERTIES - CYPRUS
  {
    id: 9,
    title: "Beachfront Villa in Limassol",
    price: "€1,200,000",
    location: "Limassol, Cyprus",
    country: "CY",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Stunning beachfront villa with Mediterranean views",
    tags: ["Villa", "Beachfront", "Mediterranean"],
    personas: { remoteWorker: 0.8, family: 0.9, investor: 0.8, retiree: 0.9, luxury: 0.9 },
    latitude: 34.7071,
    longitude: 33.0226,
    isActive: true
  },
  {
    id: 10,
    title: "Modern Apartment in Nicosia",
    price: "€450,000",
    location: "Nicosia, Cyprus",
    country: "CY",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Contemporary apartment in Cyprus capital",
    tags: ["Apartment", "Modern", "City Center"],
    personas: { remoteWorker: 0.9, family: 0.6, investor: 0.7, retiree: 0.5, luxury: 0.7 },
    latitude: 35.1856,
    longitude: 33.3823,
    isActive: true
  },
  {
    id: 11,
    title: "Luxury Villa in Paphos",
    price: "€1,800,000",
    location: "Paphos, Cyprus",
    country: "CY",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive villa with sea views in historic Paphos",
    tags: ["Villa", "Luxury", "Sea View"],
    personas: { remoteWorker: 0.7, family: 0.9, investor: 0.9, retiree: 0.95, luxury: 0.95 },
    latitude: 34.7720,
    longitude: 32.4297,
    isActive: true
  },
  // MORE UAE PROPERTIES
  {
    id: 12,
    title: "Penthouse in Abu Dhabi",
    price: "د.إ15,000,000",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Luxury penthouse with panoramic city views",
    tags: ["Penthouse", "Luxury", "City View"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.95, retiree: 0.6, luxury: 0.98 },
    latitude: 24.4539,
    longitude: 54.3773,
    isActive: true
  },
  {
    id: 13,
    title: "Beach House in Ajman",
    price: "د.إ6,500,000",
    location: "Ajman, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful beach house with private beach access",
    tags: ["Beach House", "Beachfront", "Family"],
    personas: { remoteWorker: 0.6, family: 0.95, investor: 0.8, retiree: 0.8, luxury: 0.8 },
    latitude: 25.4058,
    longitude: 55.4628,
    isActive: true
  },
  // MORE UK PROPERTIES
  {
    id: 14,
    title: "Victorian House in Manchester",
    price: "£750,000",
    location: "Manchester, UK",
    country: "UK",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful Victorian house with period features",
    tags: ["House", "Victorian", "Period"],
    personas: { remoteWorker: 0.7, family: 0.9, investor: 0.7, retiree: 0.6, luxury: 0.7 },
    latitude: 53.4808,
    longitude: -2.2426,
    isActive: true
  },
  {
    id: 15,
    title: "Modern Flat in Edinburgh",
    price: "£380,000",
    location: "Edinburgh, UK",
    country: "UK",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Contemporary flat in historic Edinburgh",
    tags: ["Flat", "Modern", "Historic City"],
    personas: { remoteWorker: 0.8, family: 0.5, investor: 0.7, retiree: 0.7, luxury: 0.6 },
    latitude: 55.9533,
    longitude: -3.1883,
    isActive: true
  },
  // SPAIN PROPERTIES
  {
    id: 16,
    title: "Beachfront Apartment in Marbella",
    price: "€650,000",
    location: "Marbella, Spain",
    country: "ES",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful beachfront apartment on Costa del Sol",
    tags: ["Apartment", "Beachfront", "Costa del Sol"],
    personas: { remoteWorker: 0.8, family: 0.8, investor: 0.7, retiree: 0.9, luxury: 0.8 },
    latitude: 36.5097,
    longitude: -4.8860,
    isActive: true
  },
  {
    id: 17,
    title: "Villa in Ibiza",
    price: "€1,500,000",
    location: "Ibiza, Spain",
    country: "ES",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Stunning villa with sea views in Ibiza",
    tags: ["Villa", "Sea View", "Island"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.8, retiree: 0.8, luxury: 0.9 },
    latitude: 38.9067,
    longitude: 1.4206,
    isActive: true
  },
  // FRANCE PROPERTIES
  {
    id: 18,
    title: "Chateau in Provence",
    price: "€2,500,000",
    location: "Provence, France",
    country: "FR",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Magnificent chateau in the heart of Provence",
    tags: ["Chateau", "Provence", "Historic"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.9, retiree: 0.95, luxury: 0.95 },
    latitude: 43.9352,
    longitude: 5.2210,
    isActive: true
  },
  {
    id: 19,
    title: "Parisian Apartment",
    price: "€1,800,000",
    location: "Paris, France",
    country: "FR",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Elegant apartment in the heart of Paris",
    tags: ["Apartment", "Paris", "Elegant"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.9, retiree: 0.7, luxury: 0.9 },
    latitude: 48.8566,
    longitude: 2.3522,
    isActive: true
  },
  // GERMANY PROPERTIES
  {
    id: 20,
    title: "Modern House in Berlin",
    price: "€850,000",
    location: "Berlin, Germany",
    country: "DE",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
    description: "Contemporary house in trendy Berlin",
    tags: ["House", "Modern", "Berlin"],
    personas: { remoteWorker: 0.9, family: 0.8, investor: 0.7, retiree: 0.6, luxury: 0.7 },
    latitude: 52.5200,
    longitude: 13.4050,
    isActive: true
  },
  {
    id: 21,
    title: "Bavarian Villa",
    price: "€1,200,000",
    location: "Bavaria, Germany",
    country: "DE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful villa in the Bavarian countryside",
    tags: ["Villa", "Bavaria", "Countryside"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.7, retiree: 0.9, luxury: 0.8 },
    latitude: 48.1351,
    longitude: 11.5820,
    isActive: true
  },
  // MORE CYPRUS PROPERTIES
  {
    id: 22,
    title: "Seaside Apartment in Larnaca",
    price: "€380,000",
    location: "Larnaca, Cyprus",
    country: "CY",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Charming seaside apartment with balcony views",
    tags: ["Apartment", "Seaside", "Balcony"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.6, retiree: 0.8, luxury: 0.6 },
    latitude: 34.9229,
    longitude: 33.6233,
    isActive: true
  },
  {
    id: 23,
    title: "Mountain Villa in Troodos",
    price: "€950,000",
    location: "Troodos Mountains, Cyprus",
    country: "CY",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Peaceful mountain villa with stunning views",
    tags: ["Villa", "Mountain", "Peaceful"],
    personas: { remoteWorker: 0.9, family: 0.8, investor: 0.7, retiree: 0.9, luxury: 0.7 },
    latitude: 34.9167,
    longitude: 32.8667,
    isActive: true
  },
  {
    id: 24,
    title: "Modern Penthouse in Ayia Napa",
    price: "€1,100,000",
    location: "Ayia Napa, Cyprus",
    country: "CY",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Luxury penthouse in vibrant Ayia Napa",
    tags: ["Penthouse", "Modern", "Luxury"],
    personas: { remoteWorker: 0.7, family: 0.6, investor: 0.8, retiree: 0.7, luxury: 0.9 },
    latitude: 34.9821,
    longitude: 33.9838,
    isActive: true
  },
  // MORE UAE PROPERTIES
  {
    id: 25,
    title: "Luxury Villa in Emirates Hills",
    price: "د.إ18,500,000",
    location: "Emirates Hills, Dubai",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive villa in prestigious Emirates Hills",
    tags: ["Villa", "Luxury", "Exclusive"],
    personas: { remoteWorker: 0.5, family: 0.9, investor: 0.95, retiree: 0.8, luxury: 0.98 },
    latitude: 25.0657,
    longitude: 55.1713,
    isActive: true
  },
  {
    id: 26,
    title: "Waterfront Apartment in Al Reem Island",
    price: "د.إ2,800,000",
    location: "Al Reem Island, Abu Dhabi",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Stunning waterfront apartment with city views",
    tags: ["Apartment", "Waterfront", "City View"],
    personas: { remoteWorker: 0.8, family: 0.8, investor: 0.8, retiree: 0.7, luxury: 0.8 },
    latitude: 24.4539,
    longitude: 54.3773,
    isActive: true
  },
  {
    id: 27,
    title: "Garden Villa in Sharjah",
    price: "د.إ4,500,000",
    location: "Sharjah, UAE",
    country: "UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Spacious garden villa perfect for families",
    tags: ["Villa", "Garden", "Family"],
    personas: { remoteWorker: 0.6, family: 0.95, investor: 0.7, retiree: 0.8, luxury: 0.7 },
    latitude: 25.3463,
    longitude: 55.4209,
    isActive: true
  },
  // MORE UK PROPERTIES
  {
    id: 28,
    title: "Victorian Terrace in Liverpool",
    price: "£420,000",
    location: "Liverpool, UK",
    country: "UK",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful Victorian terrace house",
    tags: ["House", "Victorian", "Terrace"],
    personas: { remoteWorker: 0.7, family: 0.8, investor: 0.6, retiree: 0.5, luxury: 0.6 },
    latitude: 53.4084,
    longitude: -2.9916,
    isActive: true
  },
  {
    id: 29,
    title: "Modern Loft in Glasgow",
    price: "£320,000",
    location: "Glasgow, UK",
    country: "UK",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Contemporary loft in vibrant Glasgow",
    tags: ["Loft", "Modern", "Contemporary"],
    personas: { remoteWorker: 0.9, family: 0.4, investor: 0.7, retiree: 0.6, luxury: 0.7 },
    latitude: 55.8642,
    longitude: -4.2518,
    isActive: true
  },
  // MORE USA PROPERTIES
  {
    id: 30,
    title: "Beach House in Malibu",
    price: "$2,800,000",
    location: "Malibu, California",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Stunning beach house with ocean views",
    tags: ["Beach House", "Ocean View", "Luxury"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.9, retiree: 0.8, luxury: 0.95 },
    latitude: 34.0259,
    longitude: -118.7798,
    isActive: true
  },
  {
    id: 31,
    title: "Downtown Loft in Chicago",
    price: "$850,000",
    location: "Chicago, Illinois",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Modern loft in downtown Chicago",
    tags: ["Loft", "Modern", "Downtown"],
    personas: { remoteWorker: 0.9, family: 0.5, investor: 0.8, retiree: 0.6, luxury: 0.7 },
    latitude: 41.8781,
    longitude: -87.6298,
    isActive: true
  },
  // MORE ITALY PROPERTIES
  {
    id: 32,
    title: "Apartment in Rome",
    price: "€650,000",
    location: "Rome, Italy",
    country: "Italy",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Charming apartment in historic Rome",
    tags: ["Apartment", "Historic", "Rome"],
    personas: { remoteWorker: 0.8, family: 0.7, investor: 0.7, retiree: 0.8, luxury: 0.7 },
    latitude: 41.9028,
    longitude: 12.4964,
    isActive: true
  },
  {
    id: 33,
    title: "Villa in Amalfi Coast",
    price: "€2,200,000",
    location: "Amalfi Coast, Italy",
    country: "Italy",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Breathtaking villa on the Amalfi Coast",
    tags: ["Villa", "Amalfi Coast", "Breathtaking"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.9, retiree: 0.95, luxury: 0.95 },
    latitude: 40.6340,
    longitude: 14.6026,
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
