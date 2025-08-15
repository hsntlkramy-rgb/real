import { 
  users, 
  properties, 
  userProfiles, 
  userInteractions,
  favorites,
  savedSearches,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type UserProfile,
  type InsertUserProfile,
  type UserInteraction,
  type InsertUserInteraction,
  type Favorite,
  type InsertFavorite,
  type SavedSearch,
  type InsertSavedSearch
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getUserProperties(userId: number): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  
  getUserProfile(sessionId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(sessionId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  createUserInteraction(interaction: InsertUserInteraction): Promise<UserInteraction>;
  getUserInteractions(sessionId: string): Promise<UserInteraction[]>;
  getLikedProperties(sessionId: string): Promise<Property[]>;
  getSeenPropertyIds(sessionId: string): Promise<number[]>;

  getFavorites(userId: number): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(id: number): Promise<void>;

  getSavedSearches(userId: number): Promise<SavedSearch[]>;
  addSavedSearch(savedSearch: InsertSavedSearch): Promise<SavedSearch>;
  removeSavedSearch(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private userProfiles: Map<string, UserProfile>;
  private userInteractions: UserInteraction[];
  private favorites: Favorite[] = [];
  private savedSearches: SavedSearch[] = [];
  private currentUserId: number;
  private currentPropertyId: number;
  private currentProfileId: number;
  private currentInteractionId: number;
  private currentFavoriteId: number = 1;
  private currentSavedSearchId: number = 1;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.userProfiles = new Map();
    this.userInteractions = [];
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentProfileId = 1;
    this.currentInteractionId = 1;

    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with some mock properties for testing
    const mockProperties: InsertProperty[] = [
      {
        title: "Modern Loft in Downtown",
        description: "Stunning modern loft with floor-to-ceiling windows, exposed brick walls, and premium finishes. Perfect for remote work with dedicated office space and high-speed internet. Walking distance to cafes, restaurants, and public transportation.",
        price: "$2,500/month",
        location: "Downtown District",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Modern", "Remote Work Friendly", "Urban", "High-End"],
        personas: {
          remoteWorker: 0.9,
          family: 0.3,
          investor: 0.7,
          retiree: 0.4,
          luxury: 0.8
        },
        coordinates: { lat: 40.7589, lng: -73.9851 },
        contactUrl: "https://example.com/contact/1",
        isActive: true
      },
      {
        title: "Family Home with Garden",
        description: "Spacious 4-bedroom family home with large backyard, modern kitchen, and garage. Located in quiet neighborhood with excellent schools nearby. Perfect for families looking for space and community.",
        price: "$3,200/month",
        location: "Suburban Heights",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Family-Friendly", "Spacious", "Garden", "Quiet"],
        personas: {
          remoteWorker: 0.6,
          family: 0.95,
          investor: 0.5,
          retiree: 0.7,
          luxury: 0.6
        },
        coordinates: { lat: 40.7282, lng: -73.7949 },
        contactUrl: "https://example.com/contact/2",
        isActive: true
      },
      {
        title: "Investment Opportunity Duplex",
        description: "Prime investment property with two units, each with 2 bedrooms. Strong rental history and excellent cash flow potential. Located in rapidly developing area with new infrastructure projects.",
        price: "$4,800/month",
        location: "Growth District",
        images: [
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["High Yield", "Investment", "Duplex", "Growing Area"],
        personas: {
          remoteWorker: 0.4,
          family: 0.6,
          investor: 0.95,
          retiree: 0.3,
          luxury: 0.5
        },
        coordinates: { lat: 40.6892, lng: -73.9442 },
        contactUrl: "https://example.com/contact/3",
        isActive: true
      },
      {
        title: "Beachfront Villa in Iskele",
        description: "Stunning 3-bedroom villa with direct beach access in Iskele, North Cyprus. Features panoramic sea views, private pool, and modern Mediterranean architecture. Perfect for families or investment opportunity with strong rental potential.",
        price: "€450,000",
        location: "Iskele, North Cyprus",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Beachfront", "Investment", "Family-Friendly", "Sea Views"],
        personas: {
          remoteWorker: 0.7,
          family: 0.9,
          investor: 0.95,
          retiree: 0.8,
          luxury: 0.8
        },
        coordinates: { lat: 35.2868, lng: 33.9781 },
        contactUrl: "https://example.com/contact/7",
        isActive: true
      },
      {
        title: "Modern Apartment in Magusa",
        description: "Contemporary 2-bedroom apartment in the heart of Famagusta (Magusa). Walking distance to Eastern Mediterranean University, restaurants, and historical sites. Ideal for students, professionals, or investment.",
        price: "€180,000",
        location: "Magusa (Famagusta), North Cyprus",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Modern", "University Area", "Investment", "City Center"],
        personas: {
          remoteWorker: 0.8,
          family: 0.6,
          investor: 0.9,
          retiree: 0.4,
          luxury: 0.5
        },
        coordinates: { lat: 35.1264, lng: 33.9463 },
        contactUrl: "https://example.com/contact/8",
        isActive: true
      },
      {
        title: "Luxury Penthouse Suite",
        description: "Exclusive penthouse with panoramic city views, premium amenities, and concierge service. Features include marble floors, chef's kitchen, spa bathroom, and private terrace. Ultimate luxury living experience.",
        price: "$8,500/month",
        location: "Premium Heights",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Luxury", "City Views", "Premium Amenities", "Exclusive"],
        personas: {
          remoteWorker: 0.7,
          family: 0.4,
          investor: 0.6,
          retiree: 0.8,
          luxury: 0.98
        },
        coordinates: { lat: 40.7614, lng: -73.9776 },
        contactUrl: "https://example.com/contact/4",
        isActive: true
      },
      {
        title: "Peaceful Retirement Villa",
        description: "Single-story villa perfect for peaceful living. Features accessible design, beautiful garden views, and proximity to health facilities. Quiet community with walking trails and recreational activities.",
        price: "$2,800/month",
        location: "Serene Valley",
        images: [
          "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Peaceful", "Accessible", "Garden Views", "Health Focused"],
        personas: {
          remoteWorker: 0.3,
          family: 0.5,
          investor: 0.4,
          retiree: 0.92,
          luxury: 0.7
        },
        coordinates: { lat: 40.7505, lng: -73.8370 },
        contactUrl: "https://example.com/contact/5",
        isActive: true
      },
      {
        title: "Co-working Friendly Studio",
        description: "Modern studio apartment in tech district with co-working spaces, high-speed fiber internet, and flexible lease terms. Perfect for digital nomads and remote workers seeking community and convenience.",
        price: "$1,800/month",
        location: "Tech Hub",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        tags: ["Remote Work Friendly", "Co-working", "Tech Hub", "Flexible"],
        personas: {
          remoteWorker: 0.95,
          family: 0.2,
          investor: 0.6,
          retiree: 0.2,
          luxury: 0.4
        },
        coordinates: { lat: 40.7831, lng: -73.9712 },
        contactUrl: "https://example.com/contact/6",
        isActive: true
      }
    ];

    mockProperties.forEach(async (property) => {
      await this.createProperty(property);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      avatar: null,
    };
    this.users.set(id, user);
    return user;
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.isActive);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getUserProperties(userId: number): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.userId === userId,
    );
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const newProperty: Property = { 
      ...property, 
      id,
      contactUrl: property.contactUrl || null,
      coordinates: property.coordinates || null,
      // Ensure all required fields are present
      personas: property.personas || {
        remoteWorker: 0.5,
        family: 0.5,
        investor: 0.5,
        retiree: 0.5,
        luxury: 0.5,
      },
      tags: property.tags || [],
      images: property.images || [],
      amenities: property.amenities || [],
      status: property.status || 'active',
      isActive: property.isActive !== undefined ? property.isActive : true,
      createdAt: property.createdAt || new Date().toISOString(),
      updatedAt: property.updatedAt || new Date().toISOString(),
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...property };
    this.properties.set(id, updated);
    return updated;
  }

  async getUserProfile(sessionId: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(sessionId);
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentProfileId++;
    const newProfile: UserProfile = { 
      ...profile, 
      id,
      remoteWorker: profile.remoteWorker || 0,
      family: profile.family || 0,
      investor: profile.investor || 0,
      retiree: profile.retiree || 0,
      luxury: profile.luxury || 0
    };
    this.userProfiles.set(profile.sessionId, newProfile);
    return newProfile;
  }

  async updateUserProfile(sessionId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existing = this.userProfiles.get(sessionId);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...profile };
    this.userProfiles.set(sessionId, updated);
    return updated;
  }

  async createUserInteraction(interaction: InsertUserInteraction): Promise<UserInteraction> {
    const id = this.currentInteractionId++;
    const newInteraction: UserInteraction = { ...interaction, id };
    this.userInteractions.push(newInteraction);
    return newInteraction;
  }

  async getUserInteractions(sessionId: string): Promise<UserInteraction[]> {
    return this.userInteractions.filter(i => i.sessionId === sessionId);
  }

  async getLikedProperties(sessionId: string): Promise<Property[]> {
    const likedInteractions = this.userInteractions.filter(
      i => i.sessionId === sessionId && i.action === 'like'
    );
    
    const propertyIds = likedInteractions.map(i => i.propertyId);
    return Array.from(this.properties.values()).filter(
      p => propertyIds.includes(p.id)
    );
  }

  async getSeenPropertyIds(sessionId: string): Promise<number[]> {
    const interactions = this.userInteractions.filter(
      i => i.sessionId === sessionId && (i.action === 'like' || i.action === 'pass')
    );
    
    return interactions.map(i => i.propertyId);
  }

  async getFavorites(userId: number): Promise<Favorite[]> {
    return this.favorites.filter(f => f.userId === userId);
  }

  async addFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const newFavorite: Favorite = {
      id: this.currentFavoriteId++,
      ...favorite
    };
    this.favorites.push(newFavorite);
    return newFavorite;
  }

  async removeFavorite(id: number): Promise<void> {
    this.favorites = this.favorites.filter(f => f.id !== id);
  }

  async getSavedSearches(userId: number): Promise<SavedSearch[]> {
    return this.savedSearches.filter(s => s.userId === userId);
  }

  async addSavedSearch(savedSearch: InsertSavedSearch): Promise<SavedSearch> {
    const newSavedSearch: SavedSearch = {
      id: this.currentSavedSearchId++,
      ...savedSearch
    };
    this.savedSearches.push(newSavedSearch);
    return newSavedSearch;
  }

  async removeSavedSearch(id: number): Promise<void> {
    this.savedSearches = this.savedSearches.filter(s => s.id !== id);
  }
}

export const storage = new MemStorage();
