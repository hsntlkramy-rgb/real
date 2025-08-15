const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://www.bazaraki.com/real-estate/';
const MAX_PAGES = 3; // You can increase for more listings

async function scrapePage(page) {
  const url = `${BASE_URL}?page=${page}`;
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; BlissMatchBot/1.0)'
    }
  });
  const $ = cheerio.load(data);
  const properties = [];
  $('.announcement-container').each((_, el) => {
    const title = $(el).find('.announcement-title').text().trim();
    const price = $(el).find('.announcement-block__price').text().trim();
    const link = 'https://www.bazaraki.com' + $(el).find('a.announcement-title').attr('href');
    const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
    const location = $(el).find('.announcement-block__location').text().trim();
    if (title && price && link && img) {
      properties.push({
        title,
        price,
        images: [img],
        location,
        contactUrl: link,
      });
    }
  });
  return properties;
}

async function scrapeAll() {
  let all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const props = await scrapePage(page);
      all = all.concat(props);
      console.log(`Scraped page ${page}: ${props.length} properties`);
    } catch (e) {
      console.error(`Failed to scrape page ${page}:`, e.message);
    }
  }
  fs.writeFileSync('cyprus-properties.json', JSON.stringify(all, null, 2));
  console.log(`Done! Scraped ${all.length} properties. Saved to cyprus-properties.json`);
}

scrapeAll(); 