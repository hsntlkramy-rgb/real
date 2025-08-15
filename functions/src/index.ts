import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Server as IOServer } from 'socket.io';
import { createServer } from 'http';

// Initialize Firebase Admin
admin.initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session middleware (using memory store for Cloud Functions)
import session from 'express-session';
import MemoryStore from 'memorystore';

const MemoryStoreSession = MemoryStore(session);

app.use(session({
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Import routes
import { registerRoutes } from './routes';

// Register all routes
registerRoutes(app);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({ error: message });
});

// Create HTTP server for Socket.io
const server = createServer(app);

// Socket.io setup for real-time chat
const io = new IOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room for a property or agent
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle sending a chat message
  socket.on('chatMessage', ({ roomId, message, sender }) => {
    // Broadcast to everyone in the room (user and agent)
    io.to(roomId).emit('chatMessage', { message, sender, timestamp: new Date().toISOString() });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);

// Export individual API endpoints for better performance
export const uaeProperties = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    let allProperties: any[] = [];
    let page = 0;
    const maxProperties = 300;
    const pageSize = 30;

    console.log('[UAE API] Starting to fetch properties...');

    while (allProperties.length < maxProperties && page < 10) {
      try {
        const response = await fetch('https://bayut-com1.p.rapidapi.com/agencies/get-listings?' + new URLSearchParams({
          agencySlug: 'patriot-real-estate-7737',
          hitsPerPage: pageSize.toString(),
          page: page.toString()
        }), {
          headers: {
            'x-rapidapi-key': '29ab6001ffmsh00d0be7a4829957p1e3501jsn0c0182578f54',
            'x-rapidapi-host': 'bayut-com1.p.rapidapi.com'
          }
        });

        const data = await response.json();
        const listings = data && data.data && data.data.listings || [];
        
        if (listings.length > 0) {
          allProperties = allProperties.concat(listings);
          console.log(`[UAE API] Fetched page ${page + 1}, got ${listings.length} properties, total: ${allProperties.length}`);
        }

        if (listings.length < pageSize) break;
        page++;

        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error: any) {
        console.error(`[UAE API] Error fetching page ${page + 1}:`, error.message);
        break;
      }
    }

    console.log(`[UAE API] Total properties fetched: ${allProperties.length}`);

    const formatted = allProperties.slice(0, maxProperties).map((item: any, idx: number) => {
      let propertyUrl = '';
      if (item.externalID) {
        propertyUrl = `https://www.bayut.com/property/details-${item.externalID}.html`;
      } else if (item.url) {
        propertyUrl = item.url;
      }

      return {
        id: item.id || idx + 30000,
        latitude: item.geography && item.geography.lat || item.latitude,
        longitude: item.geography && item.geography.lng || item.longitude,
        title: item.title || item.name || 'UAE Property',
        price: item.price ? `د.إ${item.price.toLocaleString()}` : 'Price on request',
        price_formatted: item.price ? `د.إ${item.price.toLocaleString()}` : 'Price on request',
        images: item.coverPhoto ? [item.coverPhoto.url] : (item.images || []),
        img_url: item.coverPhoto ? item.coverPhoto.url : (item.images && item.images[0]) || '',
        location: item.location && item.location[0] && item.location[0].name || item.address || 'UAE',
        keywords: item.purpose || item.propertyType || '',
        lister_url: propertyUrl,
        contactUrl: propertyUrl,
        contact: item.agent && item.agent.phone || item.contact || '',
        description: item.description || item.summary || '',
        tags: [
          item.propertyType,
          item.purpose,
          `${item.bedrooms || 0} bed`,
          `${item.bedrooms || 0} bath`
        ].filter(Boolean),
        personas: {
          remoteWorker: 0.6,
          family: (item.bedrooms || 0) > 2 ? 0.8 : 0.4,
          investor: 0.7,
          retiree: 0.5,
          luxury: parseFloat((item.price || '').toString().replace(/[^0-9.]/g, '')) > 3000000 ? 0.8 : 0.4
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
  } catch (error: any) {
    console.error('[UAE API] Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch UAE properties' });
  }
});

// Mock properties for testing
export const mockProperties = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  const mockProperties = [
    {
      id: 1,
      title: "Modern Apartment in Dubai Marina",
      price: "د.إ2,500,000",
      location: "Dubai Marina, UAE",
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
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"],
      img_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
      description: "Exclusive villa with private beach access",
      tags: ["Villa", "Luxury", "Beach Access"],
      personas: { remoteWorker: 0.6, family: 0.9, investor: 0.9, retiree: 0.7, luxury: 0.95 },
      latitude: 25.0657,
      longitude: 55.1713,
      isActive: true
    }
  ];

  res.json(mockProperties);
});
