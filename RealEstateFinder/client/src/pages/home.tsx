import React, { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PropertyWithScore } from '../lib/types';
import { api } from '../data/properties';
import { generatedUKProperties } from '../data/properties'; // Direct import to ensure UK properties are included
import { MapPin, Search, Heart, Eye, Scale } from 'lucide-react';
import { PropertyComparison } from '../components/property-comparison';
import { PropertyToast } from '../components/property-toast';
import { PropertySkeleton } from '../components/property-skeleton';
import { PropertyDetailModal } from '../components/property-detail-modal';
import { UKPropertiesTest } from '../components/uk-properties-test';
import { 
  Search as SearchIcon, 
  MapPin as MapPinIcon, 
  Home, 
  Heart as HeartIcon, 
  TrendingUp, 
  Star,
  Building2,
  PoundSterling,
  Coins
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());
  const [comparisonProperties, setComparisonProperties] = useState<PropertyWithScore[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithScore | null>(null);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  // Get properties for display
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: api.getProperties
  });

  // Ensure UK properties are included in the build
  const ukPropertiesCount = generatedUKProperties.length;
  console.log('UK Properties available:', ukPropertiesCount);

  // Fetch real properties from Bayut API
  const { data: allProperties = [], isLoading: propertiesLoading } = useQuery<PropertyWithScore[]>({
    queryKey: ['properties', searchQuery],
    queryFn: async () => {
      if (searchQuery.trim()) {
        return api.searchProperties(searchQuery);
      }
      return api.getProperties();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Calculate stats from real data
  const totalProperties = allProperties.length;
  const uaeProperties = allProperties.filter(p => p.country === 'UAE').length;
  const ukProperties = allProperties.filter(p => p.country === 'UK').length;
  const otherProperties = totalProperties - uaeProperties - ukProperties;

  const toggleLike = (propertyId: number) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const addToComparison = (property: PropertyWithScore) => {
    if (comparisonProperties.length >= 4) {
      setToast({
        message: 'You can compare up to 4 properties at a time. Remove one to add another.',
        type: 'error',
        isVisible: true
      });
      return;
    }
    if (!comparisonProperties.find(p => p.id === property.id)) {
      setComparisonProperties(prev => [...prev, property]);
      setToast({
        message: `${property.title} added to comparison`,
        type: 'success',
        isVisible: true
      });
    } else {
      setToast({
        message: 'Property already in comparison',
        type: 'info',
        isVisible: true
      });
    }
  };

  const removeFromComparison = (propertyId: number) => {
    const property = comparisonProperties.find(p => p.id === propertyId);
    setComparisonProperties(prev => prev.filter(p => p.id !== propertyId));
    if (property) {
      setToast({
        message: `${property.title} removed from comparison`,
        type: 'info',
        isVisible: true
      });
    }
  };

  const openComparison = () => {
    if (comparisonProperties.length < 2) {
      setToast({
        message: 'Please select at least 2 properties to compare.',
        type: 'error',
        isVisible: true
      });
      return;
    }
    setShowComparison(true);
  };

  const openPropertyDetail = (property: PropertyWithScore) => {
    setSelectedProperty(property);
    setShowPropertyDetail(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // The query will automatically refetch due to queryKey change
      // Reset loading state after a short delay to show the loading effect
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  if (propertiesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
              Discover amazing properties across UAE, Cyprus, and beyond. Real-time data from Bayut API.
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
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-8 py-4 text-white font-semibold transition-colors flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Properties Grid with Skeleton */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Properties
          </h2>
          <PropertySkeleton count={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
            Discover amazing properties across UAE, UK, and beyond. Real-time data with comprehensive property details.
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
              <button
                type="submit"
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-8 py-4 text-white font-semibold transition-colors flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{totalProperties}</div>
            <div className="text-gray-600">Total Properties</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600">{uaeProperties}</div>
            <div className="text-gray-600">UAE Properties</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600">{ukProperties}</div>
            <div className="text-gray-600">UK Properties</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-orange-600">{otherProperties}</div>
            <div className="text-gray-600">Other Countries</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/map" className="group">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
            <MapPinIcon className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
            <p className="text-blue-100">Explore properties on an interactive map</p>
          </div>
        </Link>
        
        <Link href="/swipe" className="group">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
            <HeartIcon className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Swipe Interface</h3>
            <p className="text-purple-100">Discover properties with swipe gestures</p>
          </div>
        </Link>
        
        <Link href="/test-uk" className="group">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
            <Building2 className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">🇬🇧 Test UK Properties</h3>
            <p className="text-green-100">View UK properties specifically</p>
          </div>
        </Link>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
          <TrendingUp className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Market Trends</h3>
          <p className="text-orange-100">Stay updated with market insights</p>
        </div>
      </div>

      {/* UK Properties Test Component */}
      <div className="mb-8">
        <UKPropertiesTest />
      </div>
        
      {/* Comparison Status */}
      {comparisonProperties.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {comparisonProperties.length} propert{comparisonProperties.length === 1 ? 'y' : 'ies'} selected for comparison
            {comparisonProperties.length < 2 && ' (select at least 2 to compare)'}
          </p>
        </div>
      )}
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Featured Properties ({allProperties.length} found)
        </h2>
        
        {propertiesLoading ? (
          <PropertySkeleton count={12} />
        ) : allProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allProperties.slice(0, 12).map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 touch-manipulation"
                onClick={() => openPropertyDetail(property)}
              >
                <div className="relative">
                  <img
                    src={property.img_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                    alt={property.title}
                    className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(property.id);
                    }}
                    className={`absolute top-3 right-3 p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl ${
                      likedProperties.has(property.id)
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-white text-gray-600 hover:bg-red-50 hover:scale-110'
                    }`}
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" fill={likedProperties.has(property.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToComparison(property);
                    }}
                    className={`absolute top-3 right-16 sm:right-20 p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl ${
                      comparisonProperties.find(p => p.id === property.id)
                        ? 'bg-green-500 text-white scale-110'
                        : 'bg-white text-gray-600 hover:bg-green-50 hover:scale-110'
                    }`}
                    title="Add to comparison"
                  >
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium shadow-lg">
                    {property.country}
                  </div>
                  {property.country === 'UK' && (
                    <div className="absolute top-3 left-20 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium shadow-lg">
                      £
                    </div>
                  )}
                  {property.country === 'UAE' && (
                    <div className="absolute top-3 left-20 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium shadow-lg">
                      د.إ
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg sm:text-xl mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2 text-sm sm:text-base">{property.location}</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-3">{property.price}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.tags && property.tags.length > 0 ? (
                      property.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {property.country}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <a href={property.contactUrl} target="_blank" rel="noopener noreferrer">
                      <button 
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                    </a>
                    <div className="text-sm text-gray-500 text-center sm:text-right w-full sm:w-auto">
                      {property.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {allProperties.length > 12 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Showing 12 of {allProperties.length} properties. 
              <Link href="/map" className="text-blue-600 hover:underline ml-1">
                View all on map →
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Property Comparison Modal */}
      {showComparison && (
        <PropertyComparison
          properties={comparisonProperties}
          onClose={() => setShowComparison(false)}
          onRemoveProperty={removeFromComparison}
        />
      )}

      {/* Property Detail Modal */}
      {selectedProperty && showPropertyDetail && (
        <PropertyDetailModal
          property={selectedProperty}
          isOpen={showPropertyDetail}
          onClose={() => {
            setShowPropertyDetail(false);
            setSelectedProperty(null);
          }}
        />
      )}

      {/* Toast Notifications */}
      <PropertyToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}