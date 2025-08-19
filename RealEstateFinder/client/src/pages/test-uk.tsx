import React from 'react';
import { Link } from 'wouter';
import { api, ukProperties } from '../data/properties-simple';
import { useQuery } from '@tanstack/react-query';
import { PropertyCard } from '../components/property-card';
import { 
  Home, 
  MapPin, 
  Building2, 
  PoundSterling,
  ArrowRight
} from 'lucide-react';

export default function TestUKPage() {
  // Direct UK properties reference
  const ukPropertiesCount = ukProperties.length;
  console.log('🔧 UK Properties available in test page:', ukPropertiesCount);

  // Get UK properties from API
  const { data: ukPropertiesFromApi = [], isLoading } = useQuery({
    queryKey: ['uk-properties'],
    queryFn: () => api.getPropertiesByCountry('UK')
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">🇬🇧 UK Properties Test</h1>
              <p className="text-blue-100">
                Testing UK properties integration - {ukPropertiesCount} properties available
              </p>
            </div>
            <Link href="/" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
              <Home className="w-5 h-5 mr-2 inline" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total UK Properties</p>
                <p className="text-2xl font-bold text-gray-900">{ukPropertiesCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">UK Cities</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <PoundSterling className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Currency</p>
                <p className="text-2xl font-bold text-gray-900">GBP (£)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample UK Properties */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Sample UK Properties</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading UK properties...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ukPropertiesFromApi.map((property) => (
                <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src={property.img_url}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-xl font-bold text-red-600 mb-2">{property.price}</p>
                  <p className="text-sm text-gray-500 mb-3">{property.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                      UK Property
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {property.bedrooms} BR
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* JSON Debug */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Debug: Sample UK Property Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
            <pre className="text-sm text-gray-800">
              {JSON.stringify(ukProperties[0], null, 2)}
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <MapPin className="w-5 h-5 mr-2 inline" />
              View on Map
            </Link>
            <Link href="/swipe" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <ArrowRight className="w-5 h-5 mr-2 inline" />
              Swipe Interface
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
