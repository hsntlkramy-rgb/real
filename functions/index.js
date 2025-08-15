/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const axios = require('axios');

// UAE Properties API
exports.uaeProperties = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    let allProperties = [];
    let page = 0;
    const maxProperties = 300;
    const pageSize = 30;

    console.log('[UAE API] Starting to fetch properties...');

    while (allProperties.length < maxProperties && page < 10) {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://bayut-com1.p.rapidapi.com/agencies/get-listings',
          params: {
            agencySlug: 'patriot-real-estate-7737',
            hitsPerPage: pageSize.toString(),
            page: page.toString()
          },
          headers: {
            'x-rapidapi-key': '29ab6001ffmsh00d0be7a4829957p1e3501jsn0c0182578f54',
            'x-rapidapi-host': 'bayut-com1.p.rapidapi.com'
          }
        });

        const listings = response.data && response.data.data && response.data.data.listings || [];
        if (listings.length > 0) {
          allProperties = allProperties.concat(listings);
          console.log(`[UAE API] Fetched page ${page + 1}, got ${listings.length} properties, total: ${allProperties.length}`);
        }

        if (listings.length < pageSize) break;
        page++;

        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`[UAE API] Error fetching page ${page + 1}:`, error.message);
        break;
      }
    }

    console.log(`[UAE API] Total properties fetched: ${allProperties.length}`);

    const formatted = allProperties.slice(0, maxProperties).map((item, idx) => {
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

    const properties = formatted.filter((p) => 
      p.latitude != null && p.longitude != null && 
      typeof p.latitude === 'number' && typeof p.longitude === 'number'
    );

    console.log(`[UAE API] Returning ${properties.length} valid properties`);
    res.json(properties);
  } catch (error) {
    console.error('[UAE API] Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch UAE properties' });
  }
});

// Mock properties for testing
exports.mockProperties = functions.https.onRequest(async (req, res) => {
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
