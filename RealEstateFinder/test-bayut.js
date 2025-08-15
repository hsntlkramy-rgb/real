const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://bayut-com1.p.rapidapi.com/agencies/get-listings',
  params: {
    agencySlug: 'patriot-real-estate-7737',
    hitsPerPage: '30',
    page: '0'
  },
  headers: {
    'x-rapidapi-key': 'd776e2314bmshafd795a37807f88p1f85ecjsn0320c782b186',
    'x-rapidapi-host': 'bayut-com1.p.rapidapi.com'
  }
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log('Bayut API response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData(); 