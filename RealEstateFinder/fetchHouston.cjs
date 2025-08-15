const axios = require('axios');

// US (Zillow) fetch
const usOptions = {
  method: 'GET',
  url: 'https://zillow-com4.p.rapidapi.com/properties/search-coordinates',
  params: {
    location: 'Houston, TX',
    eastLng: '-94.517205',
    westLng: '-96.193233',
    southLat: '29.170258',
    northLat: '29.657524',
    status: 'forSale',
    sort: 'relevance',
    sortType: 'asc',
    priceType: 'listPrice',
    listingType: 'agent'
  },
  headers: {
    'x-rapidapi-key': 'd776e2314bmshafd795a37807f88p1f85ecjsn0320c782b186',
    'x-rapidapi-host': 'zillow-com4.p.rapidapi.com'
  }
};

// UK (Zoopla) fetch
const ukOptions = {
  method: 'GET',
  url: 'https://zoopla.p.rapidapi.com/properties/v2/list',
  params: {
    locationValue: 'London, Greater London',
    locationIdentifier: 'london',
    category: 'residential',
    furnishedState: 'Any',
    sortOrder: 'newest_listings',
    page: '1'
  },
  headers: {
    'x-rapidapi-key': 'd776e2314bmshafd795a37807f88p1f85ecjsn0320c782b186',
    'x-rapidapi-host': 'zoopla.p.rapidapi.com'
  }
};

async function fetchUSData() {
  try {
    const response = await axios.request(usOptions);
    console.log('US Properties:', response.data);
  } catch (error) {
    console.error('US Error:', error);
  }
}

async function fetchUKData() {
  try {
    const response = await axios.request(ukOptions);
    // Log the actual listings array for inspection
    const listings = response.data && response.data.data && response.data.data.listings && response.data.data.listings.regular;
    console.log('UK Listings:', listings);
  } catch (error) {
    console.error('UK Error:', error);
  }
}

fetchUSData();
fetchUKData();