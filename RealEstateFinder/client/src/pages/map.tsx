import React, { useState, useEffect } from 'react';
import { PropertyMap } from '../components/property-map';
import { PropertyWithScore } from '../lib/types';
import { useLocation } from 'wouter';
import { generatedUAEProperties } from '../data/properties-fixed';

// Function to convert UAE properties to PropertyWithScore format
const convertToPropertyWithScore = (uaeProperty: any): PropertyWithScore => {
  return {
    id: uaeProperty.id,
    title: uaeProperty.title,
    description: uaeProperty.description,
    price: uaeProperty.price,
    location: uaeProperty.location,
    country: 'UAE',
    images: uaeProperty.images || [],
    img_url: uaeProperty.img_url || (uaeProperty.images && uaeProperty.images[0]) || '',
    tags: uaeProperty.tags || [],
    personas: uaeProperty.personas || {},
    latitude: uaeProperty.latitude,
    longitude: uaeProperty.longitude,
    isActive: uaeProperty.isActive || true,
    coordinates: {
      lat: uaeProperty.latitude,
      lng: uaeProperty.longitude
    },
    contactUrl: uaeProperty.contactUrl || uaeProperty.lister_url,
    lister_url: uaeProperty.lister_url,
    contactPhone: uaeProperty.contactPhone,
    contactEmail: uaeProperty.contactEmail
  };
};

export default function MapPage() {
  const [location, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = useState('UAE'); // Default to UAE
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<PropertyWithScore[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Get search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);
  
  // Load UAE properties and filter based on search
  useEffect(() => {
    setLoading(true);
    
    let filteredProperties = generatedUAEProperties as any[];
    
    console.log('=== MAP PAGE: Loading UAE Properties ===');
    console.log('Total UAE properties:', filteredProperties.length);
    console.log('First property:', filteredProperties[0]);
    
    // Filter by search query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        (property.tags && property.tags.some((tag: string) => tag.toLowerCase().includes(query)))
      );
      console.log('After search filter:', filteredProperties.length);
    }
    
    // Filter by country (though we're only showing UAE properties)
    if (selectedCountry !== 'All' && selectedCountry !== 'UAE') {
      filteredProperties = [];
    }
    
    // Convert to PropertyWithScore format
    const convertedProperties = filteredProperties.map(convertToPropertyWithScore);
    
    console.log('Converted properties:', convertedProperties.length);
    console.log('First converted property:', convertedProperties[0]);
    console.log('=== END MAP PAGE: Loading UAE Properties ===');
    
    setProperties(convertedProperties);
    setLoading(false);
  }, [searchQuery, selectedCountry]);

  const countries = [
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'All', name: 'All Countries' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/map?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setLocation('/map');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">UAE Property Map</h1>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Search
                </button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    Clear
                  </button>
                )}
              </form>
              
              <label htmlFor="country-select" className="text-sm font-medium text-gray-700">
                Filter by Country:
              </label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              
              <div className="text-sm text-gray-600">
                {loading ? 'Loading...' : `${properties.length} properties found`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-120px)]">
        <PropertyMap 
          initialCenter={[25.2048, 55.2708]} // UAE center (Dubai)
          initialZoom={8}
          properties={properties}
          loading={loading}
        />
      </div>
    </div>
  );
}