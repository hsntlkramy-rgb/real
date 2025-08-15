import axios from 'axios';

const BAYUT_API_KEY = '29ab6001ffmsh00d0be7a4829957p1e3501jsn0c0182578f54';
const BAYUT_HOST = 'bayut.p.rapidapi.com';

export interface BayutProperty {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  price: string;
  images: string[];
  img_url: string;
  location: string;
  contactUrl: string;
  lister_url: string;
  description: string;
  tags: string[];
  personas: {
    remoteWorker: number;
    family: number;
    investor: number;
    retiree: number;
    luxury: number;
  };
  isActive: boolean;
}

export async function fetchBayutProperties(): Promise<BayutProperty[]> {
  try {
    // First get keywords for better search
    const keywordsResponse = await axios.request({
      method: 'GET',
      url: 'https://bayut.p.rapidapi.com/keywords/list',
      params: {
        facetQuery: 'air',
        lang: 'en'
      },
      headers: {
        'x-rapidapi-key': BAYUT_API_KEY,
        'x-rapidapi-host': BAYUT_HOST
      }
    });

    const keywords = keywordsResponse.data?.keywords || [];
    
    // Fetch properties using keywords
    let allProperties: BayutProperty[] = [];
    
    for (let page = 1; page <= 5; page++) {
      try {
        const propertiesResponse = await axios.request({
          method: 'GET',
          url: 'https://bayut.p.rapidapi.com/properties/list',
          params: {
            locationExternalIDs: '5002', // Dubai
            purpose: 'for-sale',
            hitsPerPage: '25',
            page: page.toString(),
            keywords: keywords.slice(0, 5).join(',') // Use first 5 keywords
          },
          headers: {
            'x-rapidapi-key': BAYUT_API_KEY,
            'x-rapidapi-host': BAYUT_HOST
          }
        });

        const hits = propertiesResponse.data?.hits || [];
        
        const formattedProperties = hits.map((hit: any, index: number) => ({
          id: 1000 + (page - 1) * 25 + index,
          latitude: hit.geography?.lat || 25.2048,
          longitude: hit.geography?.lng || 55.2708,
          title: hit.title || 'UAE Property',
          price: hit.price ? `د.إ${hit.price.toLocaleString()}` : 'د.إPrice on request',
          images: hit.coverPhoto ? [hit.coverPhoto.url] : [],
          img_url: hit.coverPhoto?.url || '',
          location: hit.location?.[0]?.name || 'UAE',
                  contactUrl: hit.externalID ? `/property/${hit.externalID}` : '',
        lister_url: hit.externalID ? `/property/${hit.externalID}` : '',
          description: hit.description || 'Beautiful property in UAE',
          tags: [hit.purpose || 'For Sale', hit.propertyType || 'Property'],
          personas: {
            remoteWorker: 0.7,
            family: 0.8,
            investor: 0.9,
            retiree: 0.6,
            luxury: 0.8
          },
          isActive: true
        }));

        allProperties = allProperties.concat(formattedProperties);
        
        if (hits.length < 25) break; // No more pages
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        break;
      }
    }

    return allProperties;
  } catch (error) {
    console.error('Error fetching Bayut properties:', error);
    return [];
  }
} 