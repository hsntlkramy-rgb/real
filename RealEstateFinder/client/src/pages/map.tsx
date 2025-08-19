import React, { useState, useEffect, useMemo } from 'react';
import { PropertyMap } from '../components/property-map';
import { PropertyWithScore } from '../lib/types';
import { api } from '../data/properties-simple';
import { useQuery } from '@tanstack/react-query';

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  
  // Fetch real properties from Bayut API
  const { data: allProperties = [], isLoading } = useQuery({
    queryKey: ['map-properties'],
    queryFn: api.getProperties,
    staleTime: 5 * 60 * 1000,
  });

  // Filter properties by selected country
  const filteredProperties = useMemo(() => {
    if (selectedCountry === 'All') {
      return allProperties;
    }
    return allProperties.filter(property => property.country === selectedCountry);
  }, [allProperties, selectedCountry]);

  // Get property counts for stats
  const uaeCount = allProperties.filter(p => p.country === 'UAE').length;
  const ukCount = allProperties.filter(p => p.country === 'UK').length;
  const cyprusCount = allProperties.filter(p => p.country === 'Cyprus').length;
  const totalCount = allProperties.length;
  
  // Debug: Log when properties change
  useEffect(() => {
    console.log('=== MAP PAGE: Properties changed ===');
    console.log('Properties array length:', filteredProperties.length);
    console.log('Properties array:', filteredProperties);
    console.log('=== END MAP PAGE: Properties changed ===');
  }, [filteredProperties]);

  const countries = [
    { code: 'All', name: 'All Countries' },
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'Cyprus', name: 'Cyprus' },
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
                {isLoading ? 'Loading...' : `${filteredProperties.length} properties found`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCountry === country.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
        
        {/* Property Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-gray-600">Total Properties</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{uaeCount}</div>
            <div className="text-sm text-gray-600">🇦🇪 UAE Properties</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">{ukCount}</div>
            <div className="text-sm text-gray-600">🇬🇧 UK Properties</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-orange-600">{cyprusCount}</div>
            <div className="text-sm text-gray-600">🇨🇾 Cyprus Properties</div>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-120px)]">
        <PropertyMap 
          initialCenter={selectedCountry === 'UK' ? [54.0, -2.0] : [25.2048, 55.2708]} // UK center or UAE center
          initialZoom={selectedCountry === 'UK' ? 5 : 6}
          properties={filteredProperties}
          loading={isLoading}
        />
      </div>
    </div>
  );
}