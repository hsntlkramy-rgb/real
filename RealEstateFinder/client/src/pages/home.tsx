import React, { useState } from 'react';
import { Link } from 'wouter';
import { PropertyWithScore } from '../lib/types';
import { MapPin, Search, Heart, Eye } from 'lucide-react';
import cyprusProperties from '../cyprus-properties.json';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());

  // Convert Cyprus properties to PropertyWithScore format
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

  // Load and filter Cyprus properties
  const allProperties = cyprusProperties.map(convertToPropertyWithScore);
  const filteredProperties = searchQuery.trim() 
    ? allProperties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allProperties;

  // Calculate stats from Cyprus data
  const totalProperties = filteredProperties.length;
  const cyprusPropertiesCount = filteredProperties.filter(p => p.country === 'CY').length;
  const otherProperties = totalProperties - cyprusPropertiesCount;

  const toggleLike = (propertyId: number) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The query will automatically refetch due to queryKey change
  };

  // No loading state needed since we're using local data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
            Discover amazing properties across Cyprus. Beautiful homes, apartments, and villas with real photos and details.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search properties by location, type, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
              />
              <Link href={`/map?search=${encodeURIComponent(searchQuery)}`}>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-white font-semibold transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{totalProperties}</div>
            <div className="text-gray-600">Total Properties</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600">{cyprusPropertiesCount}</div>
            <div className="text-gray-600">Cyprus Properties</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-orange-600">{otherProperties}</div>
            <div className="text-gray-600">Other Countries</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/swipe" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <Heart className="h-4 w-4 mr-2" />
            Start Swiping
          </Link>
          <Link href="/map" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-2" />
            Browse Properties
          </Link>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Properties ({filteredProperties.length} found)
        </h2>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.slice(0, 12).map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={property.img_url}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={() => toggleLike(property.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      likedProperties.has(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className="h-4 w-4" fill={likedProperties.has(property.id) ? 'currentColor' : 'none'} />
                  </button>
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {property.country}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-3">{property.price}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                                     <div className="flex justify-between items-center">
                     <a href={property.contactUrl} target="_blank" rel="noopener noreferrer">
                       <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center">
                         <Eye className="h-4 w-4 mr-2" />
                         View Details
                       </button>
                     </a>
                     <div className="text-sm text-gray-500">
                       {property.country}
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredProperties.length > 12 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Showing 12 of {filteredProperties.length} properties. 
              <Link href="/map" className="text-blue-600 hover:underline ml-1">
                View all on map →
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}