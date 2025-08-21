const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import enhanced UAE properties
const enhancedUAEProperties = require('../../server/mock/enhancedUaeProperties.js');

// UAE Properties endpoint
app.get('/uae-properties', (req, res) => {
  try {
    console.log('[UAE API] Returning enhanced mock data');
    res.json(enhancedUAEProperties);
  } catch (error) {
    console.error('[UAE API] Error:', error);
    res.status(500).json({ error: 'Failed to fetch UAE properties' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'UAE Properties API is running' });
});

// Export the serverless function
module.exports.handler = serverless(app);
