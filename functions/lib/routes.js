"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const zod_1 = require("zod");
// Simple in-memory storage for Firebase Functions
class SimpleStorage {
    constructor() {
        this.properties = [];
        this.users = [];
        this.favorites = [];
        this.searches = [];
        this.initializeMockData();
    }
    initializeMockData() {
        // Add some mock properties
        this.properties = [
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
            }
        ];
    }
    getAllProperties() {
        return this.properties;
    }
    getPropertiesByCountry(country) {
        return this.properties.filter(p => { var _a; return ((_a = p.country) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === country.toLowerCase(); });
    }
    searchProperties(query) {
        let filtered = [...this.properties];
        if (query.q) {
            const searchTerm = query.q.toString().toLowerCase();
            filtered = filtered.filter((p) => {
                var _a, _b, _c;
                return ((_a = p.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm)) ||
                    ((_b = p.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm)) ||
                    ((_c = p.location) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(searchTerm));
            });
        }
        if (query.country) {
            filtered = filtered.filter((p) => { var _a; return ((_a = p.country) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === query.country.toString().toLowerCase(); });
        }
        return filtered;
    }
    getPropertyById(id) {
        return this.properties.find((p) => p.id.toString() === id);
    }
    createUser(userData) {
        const user = Object.assign(Object.assign({ id: this.users.length + 1 }, userData), { createdAt: new Date().toISOString() });
        this.users.push(user);
        return user;
    }
    authenticateUser(credentials) {
        return this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    }
    addFavorite(favoriteData) {
        const favorite = Object.assign(Object.assign({ id: this.favorites.length + 1 }, favoriteData), { createdAt: new Date().toISOString() });
        this.favorites.push(favorite);
        return favorite;
    }
    getUserFavorites(userId) {
        return this.favorites.filter(f => f.userId === userId);
    }
    saveSearch(searchData) {
        const search = Object.assign(Object.assign({ id: this.searches.length + 1 }, searchData), { createdAt: new Date().toISOString() });
        this.searches.push(search);
        return search;
    }
    getUserSavedSearches(userId) {
        return this.searches.filter(s => s.userId === userId);
    }
}
const storage = new SimpleStorage();
// Simple schemas for validation
const userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2)
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
const favoriteSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    propertyId: zod_1.z.number()
});
const searchSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    query: zod_1.z.string(),
    filters: zod_1.z.record(zod_1.z.any()).optional()
});
function registerRoutes(app) {
    // Health check endpoint
    app.get('/api/health', (req, res) => {
        res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    // Get all properties
    app.get('/api/properties', async (req, res) => {
        try {
            const properties = storage.getAllProperties();
            res.json(properties);
        }
        catch (error) {
            console.error('Error fetching properties:', error);
            res.status(500).json({ error: 'Failed to fetch properties' });
        }
    });
    // Get properties by country
    app.get('/api/properties/:country', async (req, res) => {
        try {
            const { country } = req.params;
            const properties = storage.getPropertiesByCountry(country);
            if (properties.length === 0) {
                return res.status(404).json({ error: `No properties found for ${country}` });
            }
            return res.json(properties);
        }
        catch (error) {
            console.error('Error fetching country properties:', error);
            return res.status(500).json({ error: 'Failed to fetch country properties' });
        }
    });
    // Search properties
    app.get('/api/search', async (req, res) => {
        try {
            const properties = storage.searchProperties(req.query);
            res.json(properties);
        }
        catch (error) {
            console.error('Error searching properties:', error);
            res.status(500).json({ error: 'Failed to search properties' });
        }
    });
    // Get property by ID
    app.get('/api/properties/id/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const property = storage.getPropertyById(id);
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
            return res.json(property);
        }
        catch (error) {
            console.error('Error fetching property by ID:', error);
            return res.status(500).json({ error: 'Failed to fetch property' });
        }
    });
    // User registration
    app.post('/api/auth/register', async (req, res) => {
        try {
            const validatedData = userSchema.parse(req.body);
            const user = storage.createUser(validatedData);
            res.json({ message: 'User registered successfully', user });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Validation error', details: error.errors });
            }
            else {
                console.error('Error registering user:', error);
                res.status(500).json({ error: 'Failed to register user' });
            }
        }
    });
    // User login
    app.post('/api/auth/login', async (req, res) => {
        try {
            const validatedData = loginSchema.parse(req.body);
            const user = storage.authenticateUser(validatedData);
            if (user) {
                res.json({ message: 'Login successful', user });
            }
            else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Validation error', details: error.errors });
            }
            else {
                console.error('Error logging in:', error);
                res.status(500).json({ error: 'Failed to login' });
            }
        }
    });
    // Add favorite
    app.post('/api/favorites', async (req, res) => {
        try {
            const validatedData = favoriteSchema.parse(req.body);
            const favorite = storage.addFavorite(validatedData);
            res.json({ message: 'Favorite added successfully', favorite });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Validation error', details: error.errors });
            }
            else {
                console.error('Error adding favorite:', error);
                res.status(500).json({ error: 'Failed to add favorite' });
            }
        }
    });
    // Get user favorites
    app.get('/api/favorites/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const favorites = storage.getUserFavorites(parseInt(userId));
            res.json(favorites);
        }
        catch (error) {
            console.error('Error fetching favorites:', error);
            res.status(500).json({ error: 'Failed to fetch favorites' });
        }
    });
    // Save search
    app.post('/api/saved-searches', async (req, res) => {
        try {
            const validatedData = searchSchema.parse(req.body);
            const savedSearch = storage.saveSearch(validatedData);
            res.json({ message: 'Search saved successfully', savedSearch });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Validation error', details: error.errors });
            }
            else {
                console.error('Error saving search:', error);
                res.status(500).json({ error: 'Failed to save search' });
            }
        }
    });
    // Get user saved searches
    app.get('/api/saved-searches/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const savedSearches = storage.getUserSavedSearches(parseInt(userId));
            res.json(savedSearches);
        }
        catch (error) {
            console.error('Error fetching saved searches:', error);
            res.status(500).json({ error: 'Failed to fetch saved searches' });
        }
    });
    // Get properties by location (coordinates)
    app.get('/api/properties/nearby', async (req, res) => {
        try {
            const { lat, lng, radius = 10 } = req.query;
            if (!lat || !lng) {
                return res.status(400).json({ error: 'Latitude and longitude are required' });
            }
            const properties = storage.getAllProperties();
            const userLat = parseFloat(lat.toString());
            const userLng = parseFloat(lng.toString());
            const searchRadius = parseFloat(radius.toString());
            const nearbyProperties = properties.filter((p) => {
                if (!p.latitude || !p.longitude)
                    return false;
                const distance = calculateDistance(userLat, userLng, p.latitude, p.longitude);
                return distance <= searchRadius;
            });
            // Sort by distance
            nearbyProperties.sort((a, b) => {
                const distA = calculateDistance(userLat, userLng, a.latitude, a.longitude);
                const distB = calculateDistance(userLat, userLng, b.latitude, b.longitude);
                return distA - distB;
            });
            return res.json(nearbyProperties);
        }
        catch (error) {
            console.error('Error fetching nearby properties:', error);
            return res.status(500).json({ error: 'Failed to fetch nearby properties' });
        }
    });
    // Helper function to calculate distance between two points
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    // Get properties by persona
    app.get('/api/properties/persona/:persona', async (req, res) => {
        try {
            const { persona } = req.params;
            const properties = storage.getAllProperties();
            const personaProperties = properties.filter((p) => {
                if (!p.personas || !p.personas[persona])
                    return false;
                return p.personas[persona] >= 0.6; // Threshold for good match
            });
            // Sort by persona score
            personaProperties.sort((a, b) => {
                return (b.personas[persona] || 0) - (a.personas[persona] || 0);
            });
            res.json(personaProperties);
        }
        catch (error) {
            console.error('Error fetching persona properties:', error);
            res.status(500).json({ error: 'Failed to fetch persona properties' });
        }
    });
    // Get statistics
    app.get('/api/stats', async (req, res) => {
        try {
            const properties = storage.getAllProperties();
            const stats = {
                total: properties.length,
                byCountry: properties.reduce((acc, p) => {
                    const country = p.country || 'Unknown';
                    acc[country] = (acc[country] || 0) + 1;
                    return acc;
                }, {}),
                byType: properties.reduce((acc, p) => {
                    var _a;
                    const type = ((_a = p.tags) === null || _a === void 0 ? void 0 : _a[0]) || 'Unknown';
                    acc[type] = (acc[type] || 0) + 1;
                    return acc;
                }, {})
            };
            res.json(stats);
        }
        catch (error) {
            console.error('Error fetching statistics:', error);
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    });
}
//# sourceMappingURL=routes.js.map