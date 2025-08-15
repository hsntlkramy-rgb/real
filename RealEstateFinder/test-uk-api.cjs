const axios = require('axios');

async function testUKApi() {
  try {
    const response = await axios.get('https://uk-properties.p.rapidapi.com/rent/SW1A', {
      headers: {
        'x-rapidapi-key': 'd3321a757bmshab9f01cee430d34p1908efjsn3c9d9780bd21',
        'x-rapidapi-host': 'uk-properties.p.rapidapi.com',
      },
    });
    console.log('API response:', response.data);
  } catch (err) {
    console.error('API error:', err.response ? err.response.data : err.message);
  }
}

testUKApi(); 