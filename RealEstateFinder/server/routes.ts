import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeProperty } from "./lib/openai";
import { 
  insertPropertySchema, 
  insertUserProfileSchema, 
  insertUserInteractionSchema,
  propertyAnalysisSchema,
  insertFavoriteSchema,
  insertSavedSearchSchema,
  loginUserSchema,
  registerUserSchema,
  Property
} from "@shared/schema";
import { z } from "zod";
import axios, { AxiosError } from 'axios';
import fallbackUSProperties from './mock/usProperties';
import { fallbackITProperties } from './mock/itProperties';
import fallbackUKProperties from './mock/ukProperties';
import fallbackUAEPropertiesData from './mock/uaeProperties';
// import realUAEProperties from './mock/realUaeProperties'; // Commented out to use real API data
import enhancedUAEProperties from './mock/enhancedUaeProperties';
import fallbackSpainProperties from './mock/spainProperties';
import fallbackFranceProperties from './mock/franceProperties';
import fallbackGermanyProperties from './mock/germanyProperties';
import { fetchBayutProperties } from './lib/bayut';
// @ts-ignore
import cyprusPropertiesRaw from './mock/cyprusProperties.mjs';
import express from 'express';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';

// Advanced in-memory cache for properties with pre-loading
let propertiesCache: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Pre-load all properties when server starts
let isPreloading = false;
let preloadPromise: Promise<any[]> | null = null;

// Function to pre-load all properties
async function preloadAllProperties(): Promise<any[]> {
  if (isPreloading && preloadPromise) {
    return preloadPromise;
  }
  
  if (propertiesCache) {
    return propertiesCache;
  }
  
  isPreloading = true;
  preloadPromise = loadAllPropertiesData();
  
  try {
    const result = await preloadPromise;
    propertiesCache = result;
    cacheTimestamp = Date.now();
    console.log(`[CACHE] Pre-loaded ${result.length} properties successfully`);
    return result;
  } finally {
    isPreloading = false;
    preloadPromise = null;
  }
}

// Function to load all properties data
async function loadAllPropertiesData(): Promise<any[]> {
  console.log('[CACHE] Starting to load all properties...');
  const startTime = Date.now();
  
  try {
    // Get properties from local storage
    const properties = await storage.getAllProperties();
    
    // Load additional country properties (synchronous now)
    const cyprusProperties = enrichCyprusProperties();
    const ukProperties = fallbackUKProperties;
    const usProperties = fallbackUSProperties;
    const itProperties = fallbackITProperties;
    // const uaeProperties = realUAEProperties; // Commented out to use real API data
    const uaeProperties: any[] = []; // Empty array since we'll fetch from API
    const spainProperties = fallbackSpainProperties;
    const franceProperties = fallbackFranceProperties;
    const germanyProperties = fallbackGermanyProperties;
    
    // Combine all properties
    const allProperties = [
      ...properties,
      ...cyprusProperties,
      ...ukProperties,
      ...usProperties,
      ...itProperties,
      ...uaeProperties,
      ...spainProperties,
      ...franceProperties,
      ...germanyProperties
    ];
    
    const loadTime = Date.now() - startTime;
    console.log(`[CACHE] Loaded ${allProperties.length} properties in ${loadTime}ms`);
    
    return allProperties;
  } catch (error) {
    console.error('[CACHE] Error loading properties:', error);
    throw error;
  }
}

// Define a fallback dataset for Spain properties
const fallbackESProperties = [
  {
    latitude: 40.4168,
    longitude: -3.7038,
    title: 'Fallback Property 1',
    price: '€500,000',
    img_url: '',
    location: 'Madrid, Spain',
    contactUrl: '',
    contactPhone: '',
    contactEmail: '',
    description: 'This is a fallback property.',
    tags: [],
    personas: {},
  },
  // Add more fallback properties as needed
];

// Define a fallback dataset for UAE properties
const fallbackUAEProperties = [
  {
    latitude: 25.2048,
    longitude: 55.2708,
    title: 'Fallback Property 1',
    price: 'AED 1,500,000',
    img_url: '',
    location: 'Dubai, UAE',
    contactUrl: '',
    contactPhone: '',
    contactEmail: '',
    description: 'This is a fallback property.',
    tags: [],
    personas: {},
  },
  // Add more fallback properties as needed
];

// Helper: Geocode location to coordinates (using OpenStreetMap Nominatim)
async function geocodeLocation(location: string): Promise<{ lat: number, lng: number } | undefined> {
  if (!location) return undefined;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location + ', Cyprus')}`;
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'BlissMatch/1.0' } });
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Geocoding failed for', location, error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Geocoding failed for', location, error.message);
    } else {
      console.error('Geocoding failed for', location, error);
    }
  }
  return undefined;
}

// Add coordinates to Cyprus properties if missing - optimized version
function enrichCyprusProperties() {
  // Convert latitude/longitude to coordinates format if needed
  return cyprusPropertiesRaw.map((prop: any) => {
    if (!prop.coordinates && prop.latitude && prop.longitude) {
      return {
        ...prop,
        coordinates: { lat: prop.latitude, lng: prop.longitude }
      };
    }
    return prop;
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Pre-load properties cache on server startup
  app.get("/api/init", async (req, res) => {
    try {
      console.log('[INIT] Starting properties pre-load...');
      const startTime = Date.now();
      await preloadAllProperties();
      const loadTime = Date.now() - startTime;
      res.json({ 
        message: "Properties cache initialized successfully", 
        loadTime: `${loadTime}ms`,
        propertiesCount: propertiesCache?.length || 0
      });
    } catch (error) {
      console.error('[INIT] Error initializing cache:', error);
      res.status(500).json({ message: "Failed to initialize cache" });
    }
  });
  
  // Authentication Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Create user (password should be hashed in production)
      const newUser = await storage.createUser({
        ...userData,
        role: 'user',
      });
      
      // Don't return password
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginUserSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // In production, use proper password hashing (bcrypt)
      if (user.password !== loginData.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      if (!user.isActive) {
        return res.status(401).json({ message: "Account is deactivated" });
      }
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.get("/api/auth/me/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Get user's properties
  app.get("/api/users/:userId/properties", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const properties = await storage.getUserProperties(userId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user properties" });
    }
  });
  
  // Get all properties with optional filtering - OPTIMIZED VERSION
  app.get("/api/properties", async (req, res) => {
    try {
      // Get properties from cache or pre-load them
      let allProperties: any[];
      
      if (propertiesCache && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
        allProperties = propertiesCache;
        console.log(`[CACHE] Serving ${allProperties.length} properties from cache`);
      } else {
        allProperties = await preloadAllProperties();
      }
      
      // Apply filters if provided
      const { location, price_min, price_max, tags, personas, country, search } = req.query;
      
      let filteredProperties = allProperties;
      
      // Apply search filter if provided
      if (search) {
        const searchLower = search.toString().toLowerCase();
        filteredProperties = filteredProperties.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.propertyType?.toLowerCase().includes(searchLower) ||
          p.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply other filters
      if (country && country !== 'All') {
        filteredProperties = filteredProperties.filter(p => {
          const locationLower = p.location.toLowerCase();
          const countryField = p.country?.toLowerCase();
          
          // Check both location and country field
          if (country === 'CY' && (locationLower.includes('cyprus') || countryField === 'cy')) return true;
          if (country === 'UK' && (locationLower.includes('uk') || countryField === 'uk')) return true;
          if (country === 'US' && (locationLower.includes('us') || locationLower.includes('united states') || countryField === 'us')) return true;
          if (country === 'IT' && (locationLower.includes('italy') || countryField === 'it')) return true;
          if (country === 'UAE' && (locationLower.includes('uae') || countryField === 'ue')) return true;
          if (country === 'ES' && (locationLower.includes('spain') || countryField === 'es')) return true;
          if (country === 'FR' && (locationLower.includes('france') || countryField === 'fr')) return true;
          if (country === 'DE' && (locationLower.includes('germany') || countryField === 'de')) return true;
          if (country === 'CA' && (locationLower.includes('canada') || countryField === 'ca')) return true;
          if (country === 'NL' && (locationLower.includes('netherlands') || countryField === 'nl')) return true;
          if (country === 'CH' && (locationLower.includes('switzerland') || countryField === 'ch')) return true;
          if (country === 'JP' && (locationLower.includes('japan') || countryField === 'jp')) return true;
          if (country === 'SG' && (locationLower.includes('singapore') || countryField === 'sg')) return true;
          if (country === 'BR' && (locationLower.includes('brazil') || countryField === 'br')) return true;
          return false;
        });
      }
      
      if (location) {
        filteredProperties = filteredProperties.filter(p => 
          p.location.toLowerCase().includes(location.toString().toLowerCase())
        );
      }
      
      if (price_min || price_max) {
        filteredProperties = filteredProperties.filter(p => {
          const price = p.price.replace(/[^0-9]/g, '');
          const priceNum = parseInt(price);
          if (price_min && priceNum < parseInt(price_min.toString())) return false;
          if (price_max && priceNum > parseInt(price_max.toString())) return false;
          return true;
        });
      }
      
      if (tags) {
        const tagArray = tags.toString().split(',');
        filteredProperties = filteredProperties.filter(p => 
          p.tags.some((tag: string) => tagArray.some(t => tag.toLowerCase().includes(t.toLowerCase())))
        );
      }
      
      if (personas) {
        const personaArray = personas.toString().split(',');
        filteredProperties = filteredProperties.filter(p => 
          personaArray.some(persona => p.personas[persona as keyof typeof p.personas] > 0.5)
        );
      }
      

      
      res.json(filteredProperties);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch properties.';
      res.status(500).json({ error: errorMessage });
    }
  });

  // Cache invalidation endpoint for admin use
  app.post("/api/properties/clear-cache", (req, res) => {
    propertiesCache = null;
    cacheTimestamp = 0;
    res.json({ message: "Properties cache cleared successfully" });
  });

  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Create new property with AI analysis
  app.post("/api/properties", async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      
      // If tags or personas are not provided, use AI to analyze
      if (!propertyData.tags || !propertyData.personas) {
        const analysis = await analyzeProperty(
          propertyData.description,
          propertyData.title,
          propertyData.price,
          propertyData.location
        );
        
        propertyData.tags = analysis.tags;
        propertyData.personas = analysis.personas;
      }
      
      const property = await storage.createProperty(propertyData);
      
      // Clear cache when new property is added
      propertiesCache = null;
      cacheTimestamp = 0;
      console.log('[CACHE] Cache cleared due to new property creation');
      
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  // Analyze property with AI
  app.post("/api/properties/analyze", async (req, res) => {
    try {
      const { description } = propertyAnalysisSchema.parse(req.body);
      const { title = "", price = "", location = "" } = req.body;
      
      const analysis = await analyzeProperty(description, title, price, location);
      res.json(analysis);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to analyze property" });
    }
  });

  // Get user profile
  app.get("/api/profile/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const profile = await storage.getUserProfile(sessionId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Create or update user profile
  app.post("/api/profile", async (req, res) => {
    try {
      const profileData = insertUserProfileSchema.parse(req.body);
      
      const existingProfile = await storage.getUserProfile(profileData.sessionId);
      
      let profile;
      if (existingProfile) {
        profile = await storage.updateUserProfile(profileData.sessionId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }
      
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Record user interaction (like, pass, view)
  app.post("/api/interactions", async (req, res) => {
    try {
      const interactionData = insertUserInteractionSchema.parse(req.body);
      const interaction = await storage.createUserInteraction(interactionData);
      res.status(201).json(interaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid interaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to record interaction" });
    }
  });

  // Get user's liked properties
  app.get("/api/liked/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const likedProperties = await storage.getLikedProperties(sessionId);
      res.json(likedProperties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch liked properties" });
    }
  });

  // Get recommended properties for user
  app.get("/api/recommendations/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const userProfile = await storage.getUserProfile(sessionId);
      
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      
      const allProperties = await storage.getAllProperties();
      const seenPropertyIds = await storage.getSeenPropertyIds(sessionId);
      
      // Filter out seen properties
      const unseenProperties = allProperties.filter(p => !seenPropertyIds.includes(p.id));
      
      // Calculate match scores and sort by relevance
      const propertiesWithScores = unseenProperties.map(property => {
        let score = 0;
        score += userProfile.remoteWorker * (property.personas.remoteWorker || 0);
        score += userProfile.family * (property.personas.family || 0);
        score += userProfile.investor * (property.personas.investor || 0);
        score += userProfile.retiree * (property.personas.retiree || 0);
        score += userProfile.luxury * (property.personas.luxury || 0);
        
        return { ...property, matchScore: score };
      });
      
      // Sort by match score (highest first)
      propertiesWithScores.sort((a, b) => b.matchScore - a.matchScore);
      
      res.json(propertiesWithScores);
    } catch (error) {
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  // Get user statistics
  app.get("/api/stats/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const interactions = await storage.getUserInteractions(sessionId);
      
      const totalSeen = interactions.filter(i => i.action === 'like' || i.action === 'pass').length;
      const totalLiked = interactions.filter(i => i.action === 'like').length;
      const matchRate = totalSeen > 0 ? Math.round((totalLiked / totalSeen) * 100) : 0;
      
      res.json({
        totalSeen,
        totalLiked,
        matchRate
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Favorites endpoints
  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const favoriteData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(favoriteData);
      res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid favorite data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFavorite(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  // Saved searches endpoints
  app.get("/api/saved-searches/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const savedSearches = await storage.getSavedSearches(userId);
      res.json(savedSearches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved searches" });
    }
  });

  app.post("/api/saved-searches", async (req, res) => {
    try {
      const savedSearchData = insertSavedSearchSchema.parse(req.body);
      const savedSearch = await storage.addSavedSearch(savedSearchData);
      res.status(201).json(savedSearch);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid saved search data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add saved search" });
    }
  });

  app.delete("/api/saved-searches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeSavedSearch(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove saved search" });
    }
  });

  // Nestoria proxy endpoint for real global properties
  app.get('/api/nestoria', async (req, res) => {
    const { country = 'uk', place_name = 'london' } = req.query;
    try {
      const url = `https://api.nestoria.${country}/api`;
      const response = await axios.get(url, {
        params: {
          country,
          pretty: 1,
          action: 'search_listings',
          encoding: 'json',
          listing_type: 'buy',
          place_name,
          number_of_results: 50
        }
      });
      res.json(response.data.response.listings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch properties', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // --- UAE Properties via Realty-in-UAE RapidAPI (Updated) ---
  app.get('/api/uae-properties', async (req, res) => {
    try {
      let allProperties: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25;

      console.log('[UAE API] Starting to fetch properties...');

      while (allProperties.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-uae.p.rapidapi.com/properties/list',
            params: {
              city: 'Dubai',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-uae.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          if (listings.length > 0) {
            allProperties = allProperties.concat(listings);
            console.log(`[UAE API] Fetched page ${page}, got ${listings.length} properties, total: ${allProperties.length}`);
          }

          if (listings.length < pageSize) break; // No more pages
          page++;

          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error(`[UAE API] Error fetching page ${page}:`, error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error(`[UAE API] Error fetching page ${page}:`, error.message);
          } else {
            console.error(`[UAE API] Error fetching page ${page}:`, error);
          }
          break;
        }
      }

      console.log(`[UAE API] Total properties fetched: ${allProperties.length}`);

      const formatted = allProperties.slice(0, maxProperties).map((item: any, idx: number) => {
        return {
          id: item.id || idx + 30000,
          latitude: item.property?.address?.latitude || item.latitude,
          longitude: item.property?.address?.longitude || item.longitude,
          title: item.property?.name || item.title || 'UAE Property',
          price: item.listPrice ? `د.إ${item.listPrice.toLocaleString()}` : 'Price on request',
          price_formatted: item.listPrice ? `د.إ${item.listPrice.toLocaleString()}` : 'Price on request',
          images: item.property?.photos?.map((photo: any) => photo.href) || item.images || [],
          img_url: item.property?.photos?.[0]?.href || item.images?.[0] || '',
          location: [
            item.property?.address?.city || item.location,
            'UAE'
          ].filter(Boolean).join(', '),
          keywords: item.property?.propertyType || item.propertyType || '',
          lister_url: item.property?.href || item.url || '',
          contactUrl: item.property?.href || item.url || '',
          contact: item.property?.agent?.phone || item.contact || '',
          description: item.property?.description || item.description || '',
          tags: [
            item.property?.propertyType || item.propertyType,
            `${item.property?.bedrooms || item.bedrooms || 0} bed`,
            `${item.property?.bathrooms || item.bathrooms || 0} bath`
          ].filter(Boolean),
          personas: {
            remoteWorker: 0.6,
            family: (item.property?.bedrooms || item.bedrooms || 0) > 2 ? 0.8 : 0.4,
            investor: 0.7,
            retiree: 0.5,
            luxury: parseFloat((item.listPrice || item.price || '0').toString().replace(/[^0-9.]/g, '')) > 3000000 ? 0.8 : 0.4
          },
          isActive: true,
        };
      });

      const properties = formatted.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      console.log(`[UAE API] Returning ${properties.length} valid properties`);
      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('[UAE API] Error fetching UAE properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('[UAE API] Error fetching UAE properties:', error.message);
      } else {
        console.error('[UAE API] Error fetching UAE properties:', error);
      }
      console.log('[UAE API] Falling back to enhanced mock data');
      res.json(enhancedUAEProperties);
    }
  });

  // --- AU Properties Proxy Endpoint ---
  app.get('/api/au-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 20; // AU API uses pageSize of 20
      const maxPages = Math.ceil(maxProperties / pageSize);

      while (allListings.length < maxProperties && page <= maxPages) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-au.p.rapidapi.com/agents/get-listings',
            params: {
              page: page.toString(),
              channel: 'BUY',
              linkedSalespeopleIds: '315781,2008566,2046994,2084750',
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-au.p.rapidapi.com'
            }
          });

          console.log('AU API response:', JSON.stringify(response.data, null, 2));

          let listings: any[] = [];
          if (response.data?.data?.agentListings?.listings) {
            listings = response.data.data.agentListings.listings;
          }

          if (listings.length > 0) {
            allListings = allListings.concat(listings);
          }

          const totalPages = response.data?.data?.agentListings?.pagination?.maxPageNumberAvailable || 1;
          if (page >= totalPages) break; // No more pages
          page++;

          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of AU properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of AU properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of AU properties:', error);
          }
          break; // Stop fetching on error
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any) => ({
        id: parseInt(item.id) || Date.now(),
        title: `${item.propertyType} in ${item.address?.suburb || 'Australia'}`,
        description: item.description || '',
        price: item.price || '',
        location: [
          item.address?.shortAddress,
          item.address?.suburb
        ].filter(Boolean).join(', '),
        images: (item.media?.images || [item.media?.mainImage]).filter(Boolean).map((img: string) => 
          img.replace('{size}', '800x600')
        ),
        tags: [
          item.propertyType,
          `${item.generalFeatures?.bedrooms || 0} bed`,
          `${item.generalFeatures?.bathrooms || 0} bath`,
          `${item.generalFeatures?.parkingSpaces || 0} parking`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.5,
          family: (item.generalFeatures?.bedrooms || 0) > 2 ? 0.8 : 0.4,
          investor: 0.6,
          retiree: 0.5,
          luxury: parseFloat(item.price?.replace(/[^0-9.]/g, '')) > 1000000 ? 0.8 : 0.4
        },
        coordinates: null,
        contactUrl: item._links?.canonical || null,
        contactPhone: '',
        contactEmail: '',
        isActive: true
      }));

      res.json(mapped);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching AU properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching AU properties:', error.message);
      } else {
        console.error('Error fetching AU properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch AU properties.' });
    }
  });

  // --- Cyprus Properties Endpoint ---
  app.get("/api/cyprus-properties", async (req, res) => {
    try {
      let cyprusProperties = cyprusPropertiesRaw.map((prop: any, idx: number) => {
        // Ensure images is always an array of valid URLs
        let images = Array.isArray(prop.images) ? prop.images.filter(Boolean) : [];
        // If images is empty but img_url exists, add it
        if (images.length === 0 && prop.img_url) images = [prop.img_url];
        // Always set img_url to the first image if available
        const img_url = images.length > 0 ? images[0] : (prop.img_url || "");
        return {
          ...prop,
          images,
          img_url,
        };
      });
      res.json(cyprusProperties);
    } catch (e: any) {
      res.status(500).json({ error: 'Failed to load Cyprus properties.' });
    }
  });

  // --- UK Properties via Zoopla RapidAPI (User's latest key) ---
  app.get('/api/uk-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25; // Zoopla's default page size
      const maxPages = Math.ceil(maxProperties / pageSize);

      while (allListings.length < maxProperties && page <= maxPages) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://zoopla.p.rapidapi.com/properties/v2/list',
            params: {
              locationValue: 'London',
              locationIdentifier: 'london',
              category: 'residential',
              furnishedState: 'Any',
              sortOrder: 'newest_listings',
              page: page.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'zoopla.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings?.regular || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break; // No more pages
          page++;
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of UK properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of UK properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of UK properties:', error);
          }
          break; // Stop fetching on error
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => {
        // Extract image URLs from imageUris array
        const imageUrls = Array.isArray(item.imageUris) ? item.imageUris : [];
        const firstImageUrl = imageUrls[0] || '';

        // Construct the Zoopla listing URL
        const listingUrl = `https://www.zoopla.co.uk/for-sale/details/${item.listingId}`;

        return {
          id: item.listingId || idx + 40000,
          latitude: item.location?.coordinates?.latitude,
          longitude: item.location?.coordinates?.longitude,
          title: item.title || 'UK Property',
          price_formatted: item.pricing?.label || '',
          images: imageUrls,
          img_url: firstImageUrl,
          location: item.address || '',
          keywords: `${item.attributes?.bedrooms || 0} bed, ${item.attributes?.bathrooms || 0} bath`,
          lister_url: listingUrl,
          contactUrl: item.agent?.phone ? `tel:${item.agent.phone}` : '',
          contact: item.agent?.phone || '',
          description: '',
          tags: Array.isArray(item.tags) ? item.tags.map((t: { label: string }) => t.label) : [],
          personas: {},
          isActive: true,
        };
      });

      const properties = mapped.filter((p: { latitude: number | null; longitude: number | null }) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching UK properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching UK properties:', error.message);
      } else {
        console.error('Error fetching UK properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch UK properties.' });
    }
  });

  // --- US Properties via Realty-in-US RapidAPI (User's latest key) ---
  app.get('/api/us-properties', async (req, res) => {
    try {
      // For now, use mock data until we get API access
      res.json(fallbackUSProperties);
    } catch (error: any) {
      console.error('Error fetching US properties:', error);
      res.status(500).json({ error: 'Failed to fetch US properties.' });
    }
  });

  // --- Canada Properties via Realty-in-CA RapidAPI ---
  app.get('/api/ca-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 20;

      while (allListings.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-ca.p.rapidapi.com/properties/list',
            params: {
              city: 'Toronto',
              province_code: 'ON',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-ca.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break;
          page++;
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of CA properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of CA properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of CA properties:', error);
          }
          break;
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => ({
        id: item.id || idx + 50000,
        latitude: item.property?.address?.latitude,
        longitude: item.property?.address?.longitude,
        title: item.property?.name || 'Canadian Property',
        price: item.listPrice ? `C$${item.listPrice.toLocaleString()}` : 'Price on request',
        images: item.property?.photos?.map((photo: any) => photo.href) || [],
        img_url: item.property?.photos?.[0]?.href || '',
        location: [
          item.property?.address?.city,
          item.property?.address?.province
        ].filter(Boolean).join(', '),
        contactUrl: item.property?.href || '',
        lister_url: item.property?.href || '',
        description: item.property?.description || '',
        tags: [
          item.property?.propertyType,
          `${item.property?.bedrooms || 0} bed`,
          `${item.property?.bathrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.6,
          family: (item.property?.bedrooms || 0) > 2 ? 0.8 : 0.4,
          investor: 0.7,
          retiree: 0.5,
          luxury: parseFloat(item.listPrice?.replace(/[^0-9.]/g, '')) > 1000000 ? 0.8 : 0.4
        },
        isActive: true
      }));

      const properties = mapped.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching CA properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching CA properties:', error.message);
      } else {
        console.error('Error fetching CA properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch CA properties.' });
    }
  });

  // --- Netherlands Properties via Realty-in-NL RapidAPI ---
  app.get('/api/nl-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25;

      while (allListings.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-nl.p.rapidapi.com/properties/list',
            params: {
              city: 'Amsterdam',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-nl.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break;
          page++;
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of NL properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of NL properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of NL properties:', error);
          }
          break;
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => ({
        id: item.id || idx + 60000,
        latitude: item.property?.address?.latitude,
        longitude: item.property?.address?.longitude,
        title: item.property?.name || 'Dutch Property',
        price: item.listPrice ? `€${item.listPrice.toLocaleString()}` : 'Price on request',
        images: item.property?.photos?.map((photo: any) => photo.href) || [],
        img_url: item.property?.photos?.[0]?.href || '',
        location: [
          item.property?.address?.city,
          'Netherlands'
        ].filter(Boolean).join(', '),
        contactUrl: item.property?.href || '',
        lister_url: item.property?.href || '',
        description: item.property?.description || '',
        tags: [
          item.property?.propertyType,
          `${item.property?.bedrooms || 0} bed`,
          `${item.property?.bathrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.7,
          family: (item.property?.bedrooms || 0) > 2 ? 0.8 : 0.4,
          investor: 0.6,
          retiree: 0.5,
          luxury: parseFloat(item.listPrice?.replace(/[^0-9.]/g, '')) > 800000 ? 0.8 : 0.4
        },
        isActive: true
      }));

      const properties = mapped.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching NL properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching NL properties:', error.message);
      } else {
        console.error('Error fetching NL properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch NL properties.' });
    }
  });

  // --- Switzerland Properties via Realty-in-CH RapidAPI ---
  app.get('/api/ch-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25;

      while (allListings.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-ch.p.rapidapi.com/properties/list',
            params: {
              city: 'Zurich',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-ch.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break;
          page++;
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of CH properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of CH properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of CH properties:', error);
          }
          break;
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => ({
        id: item.id || idx + 70000,
        latitude: item.property?.address?.latitude,
        longitude: item.property?.address?.longitude,
        title: item.property?.name || 'Swiss Property',
        price: item.listPrice ? `CHF ${item.listPrice.toLocaleString()}` : 'Price on request',
        images: item.property?.photos?.map((photo: any) => photo.href) || [],
        img_url: item.property?.photos?.[0]?.href || '',
        location: [
          item.property?.address?.city,
          'Switzerland'
        ].filter(Boolean).join(', '),
        contactUrl: item.property?.href || '',
        lister_url: item.property?.href || '',
        description: item.property?.description || '',
        tags: [
          item.property?.propertyType,
          `${item.property?.bedrooms || 0} bed`,
          `${item.property?.bathrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.6,
          family: (item.property?.bedrooms || 0) > 2 ? 0.8 : 0.4,
          investor: 0.8,
          retiree: 0.7,
          luxury: parseFloat(item.listPrice?.replace(/[^0-9.]/g, '')) > 1500000 ? 0.9 : 0.5
        },
        isActive: true
      }));

      const properties = mapped.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching CH properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching CH properties:', error.message);
      } else {
        console.error('Error fetching CH properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch CH properties.' });
    }
  });

  // --- Japan Properties via Realty-in-JP RapidAPI ---
  app.get('/api/jp-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25;

      while (allListings.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-jp.p.rapidapi.com/properties/list',
            params: {
              city: 'Tokyo',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-jp.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break;
          page++;
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of JP properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of JP properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of JP properties:', error);
          }
          break;
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => ({
        id: item.id || idx + 80000,
        latitude: item.property?.address?.latitude,
        longitude: item.property?.address?.longitude,
        title: item.property?.name || 'Japanese Property',
        price: item.listPrice ? `¥${item.listPrice.toLocaleString()}` : 'Price on request',
        images: item.property?.photos?.map((photo: any) => photo.href) || [],
        img_url: item.property?.photos?.[0]?.href || '',
        location: [
          item.property?.address?.city,
          'Japan'
        ].filter(Boolean).join(', '),
        contactUrl: item.property?.href || '',
        lister_url: item.property?.href || '',
        description: item.property?.description || '',
        tags: [
          item.property?.propertyType,
          `${item.property?.bedrooms || 0} bed`,
          `${item.property?.bathrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.8,
          family: (item.property?.bedrooms || 0) > 2 ? 0.7 : 0.4,
          investor: 0.7,
          retiree: 0.5,
          luxury: parseFloat(item.listPrice?.replace(/[^0-9.]/g, '')) > 80000000 ? 0.8 : 0.4
        },
        isActive: true
      }));

      const properties = mapped.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching JP properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching JP properties:', error.message);
      } else {
        console.error('Error fetching JP properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch JP properties.' });
    }
  });

  // --- Singapore Properties via Realty-in-SG RapidAPI ---
  app.get('/api/sg-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25;

      while (allListings.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-sg.p.rapidapi.com/properties/list',
            params: {
              city: 'Singapore',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-sg.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break;
          page++;
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of SG properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of SG properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of SG properties:', error);
          }
          break;
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => ({
        id: item.id || idx + 90000,
        latitude: item.property?.address?.latitude,
        longitude: item.property?.address?.longitude,
        title: item.property?.name || 'Singapore Property',
        price: item.listPrice ? `S$${item.listPrice.toLocaleString()}` : 'Price on request',
        images: item.property?.photos?.map((photo: any) => photo.href) || [],
        img_url: item.property?.photos?.[0]?.href || '',
        location: [
          item.property?.address?.city || 'Singapore',
          'Singapore'
        ].filter(Boolean).join(', '),
        contactUrl: item.property?.href || '',
        lister_url: item.property?.href || '',
        description: item.property?.description || '',
        tags: [
          item.property?.propertyType,
          `${item.property?.bedrooms || 0} bed`,
          `${item.property?.bathrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.7,
          family: (item.property?.bedrooms || 0) > 2 ? 0.7 : 0.4,
          investor: 0.8,
          retiree: 0.5,
          luxury: parseFloat(item.listPrice?.replace(/[^0-9.]/g, '')) > 3000000 ? 0.9 : 0.5
        },
        isActive: true
      }));

      const properties = mapped.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching SG properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching SG properties:', error.message);
      } else {
        console.error('Error fetching SG properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch SG properties.' });
    }
  });

  // --- Brazil Properties via Realty-in-BR RapidAPI ---
  app.get('/api/br-properties', async (req, res) => {
    try {
      let allListings: any[] = [];
      let page = 1;
      const maxProperties = 250;
      const pageSize = 25;

      while (allListings.length < maxProperties && page <= 10) {
        try {
          const response = await axios.request({
            method: 'GET',
            url: 'https://realty-in-br.p.rapidapi.com/properties/list',
            params: {
              city: 'Sao Paulo',
              sort: 'Relevance',
              page: page.toString(),
              pageSize: pageSize.toString()
            },
            headers: {
              'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
              'x-rapidapi-host': 'realty-in-br.p.rapidapi.com'
            }
          });

          const listings = response.data?.data?.listings || [];
          allListings = allListings.concat(listings);
          
          if (listings.length < pageSize) break;
          page++;
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error('Error fetching page', page, 'of BR properties:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('Error fetching page', page, 'of BR properties:', error.message);
          } else {
            console.error('Error fetching page', page, 'of BR properties:', error);
          }
          break;
        }
      }

      const mapped = allListings.slice(0, maxProperties).map((item: any, idx: number) => ({
        id: item.id || idx + 100000,
        latitude: item.property?.address?.latitude,
        longitude: item.property?.address?.longitude,
        title: item.property?.name || 'Brazilian Property',
        price: item.listPrice ? `R$${item.listPrice.toLocaleString()}` : 'Price on request',
        images: item.property?.photos?.map((photo: any) => photo.href) || [],
        img_url: item.property?.photos?.[0]?.href || '',
        location: [
          item.property?.address?.city,
          'Brazil'
        ].filter(Boolean).join(', '),
        contactUrl: item.property?.href || '',
        lister_url: item.property?.href || '',
        description: item.property?.description || '',
        tags: [
          item.property?.propertyType,
          `${item.property?.bedrooms || 0} bed`,
          `${item.property?.bathrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.6,
          family: (item.property?.bedrooms || 0) > 2 ? 0.8 : 0.4,
          investor: 0.7,
          retiree: 0.4,
          luxury: parseFloat(item.listPrice?.replace(/[^0-9.]/g, '')) > 2000000 ? 0.8 : 0.4
        },
        isActive: true
      }));

      const properties = mapped.filter((p: any) => 
        p.latitude != null && p.longitude != null && 
        typeof p.latitude === 'number' && typeof p.longitude === 'number'
      );

      res.json(properties);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching BR properties:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error fetching BR properties:', error.message);
      } else {
        console.error('Error fetching BR properties:', error);
      }
      res.status(500).json({ error: 'Failed to fetch BR properties.' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
