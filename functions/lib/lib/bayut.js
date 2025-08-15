"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBayutProperties = fetchBayutProperties;
const axios_1 = __importDefault(require("axios"));
const BAYUT_API_KEY = '29ab6001ffmsh00d0be7a4829957p1e3501jsn0c0182578f54';
const BAYUT_HOST = 'bayut.p.rapidapi.com';
async function fetchBayutProperties() {
    var _a, _b;
    try {
        // First get keywords for better search
        const keywordsResponse = await axios_1.default.request({
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
        const keywords = ((_a = keywordsResponse.data) === null || _a === void 0 ? void 0 : _a.keywords) || [];
        // Fetch properties using keywords
        let allProperties = [];
        for (let page = 1; page <= 5; page++) {
            try {
                const propertiesResponse = await axios_1.default.request({
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
                const hits = ((_b = propertiesResponse.data) === null || _b === void 0 ? void 0 : _b.hits) || [];
                const formattedProperties = hits.map((hit, index) => {
                    var _a, _b, _c, _d, _e;
                    return ({
                        id: 1000 + (page - 1) * 25 + index,
                        latitude: ((_a = hit.geography) === null || _a === void 0 ? void 0 : _a.lat) || 25.2048,
                        longitude: ((_b = hit.geography) === null || _b === void 0 ? void 0 : _b.lng) || 55.2708,
                        title: hit.title || 'UAE Property',
                        price: hit.price ? `د.إ${hit.price.toLocaleString()}` : 'د.إPrice on request',
                        images: hit.coverPhoto ? [hit.coverPhoto.url] : [],
                        img_url: ((_c = hit.coverPhoto) === null || _c === void 0 ? void 0 : _c.url) || '',
                        location: ((_e = (_d = hit.location) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.name) || 'UAE',
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
                    });
                });
                allProperties = allProperties.concat(formattedProperties);
                if (hits.length < 25)
                    break; // No more pages
            }
            catch (error) {
                console.error(`Error fetching page ${page}:`, error);
                break;
            }
        }
        return allProperties;
    }
    catch (error) {
        console.error('Error fetching Bayut properties:', error);
        return [];
    }
}
//# sourceMappingURL=bayut.js.map