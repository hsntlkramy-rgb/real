import React, { useState, useEffect } from 'react';
import { PropertyMap } from '../components/property-map';
import { PropertyWithScore } from '../lib/types';
import { useLocation } from 'wouter';
import cyprusProperties from '../cyprus-properties.json';

// Function to convert Cyprus properties to PropertyWithScore format
const convertToPropertyWithScore = (cyprusProperty: any): PropertyWithScore => {
  return {
    id: Math.random(), // Generate random ID since Cyprus properties don't have one
    title: cyprusProperty.title,
    description: cyprusProperty.description,
    price: cyprusProperty.price,
    location: cyprusProperty.location,
    country: 'CY',
    images: cyprusProperty.images || [],
    img_url: cyprusProperty.img_url || (cyprusProperty.images && cyprusProperty.images[0]) || '',
    tags: cyprusProperty.tags || [],
    personas: cyprusProperty.personas || {},
    latitude: cyprusProperty.latitude,
    longitude: cyprusProperty.longitude,
    isActive: cyprusProperty.isActive || true,
    coordinates: {
      lat: cyprusProperty.latitude,
      lng: cyprusProperty.longitude
    },
    contactUrl: cyprusProperty.contactUrl || cyprusProperty.lister_url,
    lister_url: cyprusProperty.lister_url,
    contactPhone: cyprusProperty.contactPhone,
    contactEmail: cyprusProperty.contactEmail
  };
};

export default function MapPage() {
  const [location, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = useState('CY'); // Default to Cyprus
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
  
  // Load Cyprus properties and filter based on search
  useEffect(() => {
    setLoading(true);
    
    let filteredProperties = cyprusProperties as any[];
    
    console.log('=== MAP PAGE: Loading Cyprus Properties ===');
    console.log('Total Cyprus properties:', filteredProperties.length);
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
    
    // Filter by country (though we're only showing Cyprus properties)
    if (selectedCountry !== 'All' && selectedCountry !== 'CY') {
      filteredProperties = [];
    }
    
    // Convert to PropertyWithScore format
    const convertedProperties = filteredProperties.map(convertToPropertyWithScore);
    
    console.log('Converted properties:', convertedProperties.length);
    console.log('First converted property:', convertedProperties[0]);
    console.log('=== END MAP PAGE: Loading Cyprus Properties ===');
    
    setProperties(convertedProperties);
    setLoading(false);
  }, [searchQuery, selectedCountry]);

  const countries = [
    { code: 'CY', name: 'Cyprus' },
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
            <h1 className="text-2xl font-bold text-gray-800">Cyprus Property Map</h1>
            
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
          initialCenter={[35.1264, 33.4299]} // Cyprus center
          initialZoom={8}
          properties={properties}
          loading={loading}
        />
      </div>
    </div>
  );
}