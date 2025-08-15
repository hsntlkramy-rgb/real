const axios = require('axios');

async function testUKApi() {
  try {
    const response = await axios.get('https://uk-properties.p.rapidapi.com/rent/SW1A', {
      headers: {
        'x-rapidapi-key': 'a92aa1eeb4msh7bbffa51f405f9dp1b970cjsn5e5f66090ae7',
        'x-rapidapi-host': 'uk-properties.p.rapidapi.com',
      },
    });
    console.log('API response:', response.data);
  } catch (err) {
    console.error('API error:', err.response ? err.response.data : err.message);
  }
}

testUKApi(); 