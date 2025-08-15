import { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What matters most to you in a home?",
    options: [
      { text: "High-speed internet and quiet workspace", scores: { remoteWorker: 0.9 } },
      { text: "Family-friendly neighborhood with good schools", scores: { family: 0.9 } },
      { text: "High rental yield potential", scores: { investor: 0.9 } },
      { text: "Peaceful surroundings for relaxation", scores: { retiree: 0.9 } },
      { text: "Premium amenities and luxury finishes", scores: { luxury: 0.9 } }
    ]
  },
  {
    question: "What's your ideal location setting?",
    options: [
      { text: "City center with coworking spaces", scores: { remoteWorker: 0.8 } },
      { text: "Suburban area with parks and schools", scores: { family: 0.8 } },
      { text: "Growing area with development potential", scores: { investor: 0.8 } },
      { text: "Quiet coastal or countryside location", scores: { retiree: 0.8 } },
      { text: "Exclusive district with prestige", scores: { luxury: 0.8 } }
    ]
  },
  {
    question: "How soon are you planning to buy?",
    options: [
      { text: "Within 3 months - need to relocate for work", scores: { remoteWorker: 0.7 } },
      { text: "Within 6 months - family is growing", scores: { family: 0.7 } },
      { text: "Within a year - waiting for right opportunity", scores: { investor: 0.7 } },
      { text: "No rush - exploring options", scores: { retiree: 0.7 } },
      { text: "When I find the perfect property", scores: { luxury: 0.7 } }
    ]
  },
  {
    question: "What's your budget range?",
    options: [
      { text: "Under €200,000 - starter property", scores: { remoteWorker: 0.6, family: 0.6 } },
      { text: "€200,000 - €400,000 - comfortable living", scores: { family: 0.8, retiree: 0.7 } },
      { text: "€400,000 - €800,000 - investment grade", scores: { investor: 0.8, luxury: 0.6 } },
      { text: "€800,000+ - premium properties", scores: { luxury: 0.9, investor: 0.7 } },
      { text: "Flexible based on opportunity", scores: { investor: 0.6 } }
    ]
  },
  {
    question: "Do you have residency or will you apply?",
    options: [
      { text: "EU citizen - can buy immediately", scores: { remoteWorker: 0.5, family: 0.5, investor: 0.5 } },
      { text: "Will apply for residency through investment", scores: { investor: 0.8, luxury: 0.6 } },
      { text: "Planning to retire and get residency", scores: { retiree: 0.8 } },
      { text: "Working remotely, flexible on residency", scores: { remoteWorker: 0.8 } },
      { text: "Not sure yet, just exploring", scores: {} }
    ]
  },
  {
    question: "What type of property interests you most?",
    options: [
      { text: "Modern apartment with office space", scores: { remoteWorker: 0.8 } },
      { text: "Family house with garden and multiple bedrooms", scores: { family: 0.9 } },
      { text: "Commercial or mixed-use for rental income", scores: { investor: 0.9 } },
      { text: "Single-story villa for easy living", scores: { retiree: 0.8 } },
      { text: "Luxury penthouse or beachfront property", scores: { luxury: 0.9 } }
    ]
  },
  {
    question: "Which amenities are most important?",
    options: [
      { text: "Reliable internet and workspace", scores: { remoteWorker: 0.8 } },
      { text: "Schools, parks, and family facilities", scores: { family: 0.8 } },
      { text: "Rental potential and location accessibility", scores: { investor: 0.8 } },
      { text: "Healthcare access and peaceful environment", scores: { retiree: 0.8 } },
      { text: "Pool, gym, concierge, and premium finishes", scores: { luxury: 0.8 } }
    ]
  },
  {
    question: "How do you prefer to view properties?",
    options: [
      { text: "Quick virtual tours - I'm busy with work", scores: { remoteWorker: 0.6 } },
      { text: "Detailed family-friendly walkthroughs", scores: { family: 0.6 } },
      { text: "Financial analysis and ROI focus", scores: { investor: 0.6 } },
      { text: "Relaxed viewing at my own pace", scores: { retiree: 0.6 } },
      { text: "VIP private showings with full service", scores: { luxury: 0.6 } }
    ]
  }
];

// Mock properties for testing
export const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Dubai Marina",
    price: "د.إ2,500,000",
    location: "Dubai Marina, UAE",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    description: "Beautiful modern apartment with marina views. Features include high-speed internet, modern kitchen, and stunning city views.",
    tags: ["Apartment", "Modern", "Marina View", "High-Speed Internet"],
    personas: { remoteWorker: 0.8, family: 0.6, investor: 0.7, retiree: 0.4, luxury: 0.8 },
    latitude: 25.1972,
    longitude: 55.2744,
    isActive: true,
    lister_url: "https://www.bayut.com/property/details-123.html",
    contactUrl: "https://www.bayut.com/property/details-123.html"
  },
  {
    id: 2,
    title: "Luxury Villa in Palm Jumeirah",
    price: "د.إ8,500,000",
    location: "Palm Jumeirah, UAE",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    description: "Exclusive villa with private beach access. Features include private pool, garden, and luxury finishes throughout.",
    tags: ["Villa", "Luxury", "Beach Access", "Private Pool"],
    personas: { remoteWorker: 0.6, family: 0.9, investor: 0.9, retiree: 0.7, luxury: 0.95 },
    latitude: 25.0657,
    longitude: 55.1713,
    isActive: true,
    lister_url: "https://www.bayut.com/property/details-456.html",
    contactUrl: "https://www.bayut.com/property/details-456.html"
  },
  {
    id: 3,
    title: "Downtown Penthouse with City Views",
    price: "د.إ5,200,000",
    location: "Downtown Dubai, UAE",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
    description: "Stunning penthouse in the heart of downtown with panoramic city views and luxury amenities.",
    tags: ["Penthouse", "Downtown", "City Views", "Luxury"],
    personas: { remoteWorker: 0.7, family: 0.5, investor: 0.8, retiree: 0.6, luxury: 0.9 },
    latitude: 25.2048,
    longitude: 55.2708,
    isActive: true,
    lister_url: "https://www.bayut.com/property/details-789.html",
    contactUrl: "https://www.bayut.com/property/details-789.html"
  },
  {
    id: 4,
    title: "Family Home in Arabian Ranches",
    price: "د.إ4,800,000",
    location: "Arabian Ranches, UAE",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
    description: "Spacious family home in a quiet neighborhood with garden, multiple bedrooms, and community facilities.",
    tags: ["Family Home", "Garden", "Multiple Bedrooms", "Community"],
    personas: { remoteWorker: 0.5, family: 0.9, investor: 0.6, retiree: 0.7, luxury: 0.6 },
    latitude: 25.0657,
    longitude: 55.1713,
    isActive: true,
    lister_url: "https://www.bayut.com/property/details-101.html",
    contactUrl: "https://www.bayut.com/property/details-101.html"
  },
  {
    id: 5,
    title: "Investment Studio in JLT",
    price: "د.إ1,200,000",
    location: "JLT, UAE",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"],
    img_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    description: "Perfect investment studio with high rental yield potential in a prime business district.",
    tags: ["Studio", "Investment", "High Yield", "Business District"],
    personas: { remoteWorker: 0.8, family: 0.3, investor: 0.9, retiree: 0.4, luxury: 0.4 },
    latitude: 25.0657,
    longitude: 55.1713,
    isActive: true,
    lister_url: "https://www.bayut.com/property/details-202.html",
    contactUrl: "https://www.bayut.com/property/details-202.html"
  }
];
