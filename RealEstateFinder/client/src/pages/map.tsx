import React, { useState, useEffect } from 'react';
import { PropertyMap } from '../components/property-map';
import { PropertyWithScore } from '../lib/types';
import { api } from '../data/properties';
import { useQuery } from '@tanstack/react-query';

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  
  // Fetch real properties from Bayut API
  const { data: properties = [], isLoading: loading } = useQuery<PropertyWithScore[]>({
    queryKey: ['map-properties', selectedCountry],
    queryFn: async () => {
      console.log('=== MAP PAGE DEBUG ===');
      console.log('Selected country:', selectedCountry);
      
      let result;
      if (selectedCountry === 'All') {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Property Map</h1>
            
            <div className="flex items-center gap-4">
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