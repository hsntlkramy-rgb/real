import React, { useState, useEffect } from 'react';
import { PropertyMap } from '../components/property-map';
import { PropertyWithScore } from '../lib/types';
import { api } from '../data/properties';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';

export default function MapPage() {
  const [location, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);
  
  // Fetch real properties from Bayut API
  const { data: properties = [], isLoading: loading } = useQuery<PropertyWithScore[]>({
    queryKey: ['map-properties', selectedCountry, searchQuery],
    queryFn: async () => {
      console.log('=== MAP PAGE DEBUG ===');
      console.log('Selected country:', selectedCountry);
      console.log('Search query:', searchQuery);
      
      let result;
      if (searchQuery.trim()) {
        // If there's a search query, search across all properties
        result = await api.searchProperties(searchQuery);
        console.log('Search results:', result.length);
      } else if (selectedCountry === 'All') {
        result = await api.getProperties();
      } else {
        result = await api.getPropertiesByCountry(selectedCountry);
      }
      
      console.log('API returned properties:', result.length);
      console.log('First 3 properties:', result.slice(0, 3).map(p => ({ id: p.id, title: p.title, country: p.country })));
      console.log('=== END MAP PAGE DEBUG ===');
      
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  // Debug: Log when properties change
  useEffect(() => {
    console.log('=== MAP PAGE: Properties changed ===');
    console.log('Properties array length:', properties.length);
    console.log('Properties array:', properties);
    console.log('=== END MAP PAGE: Properties changed ===');
  }, [properties]);

  const countries = [
    { code: 'All', name: 'All Countries' },
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }
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
            <h1 className="text-2xl font-bold text-gray-800">Property Map</h1>
            
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
          initialCenter={[25.2048, 55.2708]} // UAE center
          initialZoom={6}
          properties={properties}
          loading={loading}
        />
      </div>
    </div>
  );
}