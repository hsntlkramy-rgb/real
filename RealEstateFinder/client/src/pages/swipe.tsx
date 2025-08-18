import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PropertyWithScore } from '../lib/types';
import { api } from '../data/properties';
import { Heart, X, MapPin, Home, Star, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SwipePage() {
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<'country-select' | 'swipe'>('country-select');
  const [likedProperties, setLikedProperties] = useState<PropertyWithScore[]>([]);
  const [passedProperties, setPassedProperties] = useState<PropertyWithScore[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Refs for touch handling
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const countries = [
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }
  ];

  // Fetch properties for selected country using Bayut API
  const { data: properties = [], isLoading: loading } = useQuery<PropertyWithScore[]>({
    queryKey: ['swipe-properties', selectedCountry?.code, minPrice, maxPrice],
    queryFn: async () => {
      if (!selectedCountry) return [];
      
      try {
        if (selectedCountry.code === 'UAE') {
          // Use Bayut API for UAE
          return api.getPropertiesByCountry('UAE');
        } else {
          // Use mock data for other countries
          return api.getPropertiesByCountry(selectedCountry.code);
        }
      } catch (error) {
        console.error('Error loading properties:', error);
        return [];
      }
    },
    enabled: !!selectedCountry && currentStep === 'swipe',
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const handleCountrySelect = (country: { code: string; name: string }) => {
    setSelectedCountry(country);
    setCurrentIndex(0);
    setCurrentStep('swipe');
    setLikedProperties([]);
    setPassedProperties([]);
    setError(null);
  };

  const handleLike = () => {
    if (currentIndex < properties.length) {
      const property = properties[currentIndex];
      setLikedProperties(prev => [...prev, property]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < properties.length) {
      const property = properties[currentIndex];
      setPassedProperties(prev => [...prev, property]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    
    const diffX = touchStartX.current - touchCurrentX;
    const diffY = touchStartY.current - touchCurrentY;
    
    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;
    
    // Minimum swipe distance
    const minSwipeDistance = 100;
    
    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swipe left = Pass
        setSwipeDirection('left');
        setTimeout(() => {
          handlePass();
          setSwipeDirection(null);
        }, 300);
      } else {
        // Swipe right = Like
        setSwipeDirection('right');
        setTimeout(() => {
          handleLike();
          setSwipeDirection(null);
        }, 300);
      }
    }
    
    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentStep !== 'swipe' || currentIndex >= properties.length) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setSwipeDirection('left');
          setTimeout(() => {
            handlePass();
            setSwipeDirection(null);
          }, 300);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSwipeDirection('right');
          setTimeout(() => {
            handleLike();
            setSwipeDirection(null);
          }, 300);
          break;
        case ' ':
          e.preventDefault();
          handleLike();
          break;
        case 'Escape':
          e.preventDefault();
          handlePass();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, currentIndex, properties.length]);

  const handleBackToCountrySelect = () => {
    setCurrentStep('country-select');
    setSelectedCountry(null);
    setCurrentIndex(0);
    setLikedProperties([]);
    setPassedProperties([]);
  };

  if (currentStep === 'country-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Location</h1>
            <p className="text-gray-600">Select a country to start swiping through properties</p>
          </div>

          <div className="space-y-3">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{country.name}</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties from {selectedCountry?.name}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <X className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToCountrySelect}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Another Country
          </button>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-gray-400 mb-4">
            <Home className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Properties Found</h2>
          <p className="text-gray-600 mb-6">No properties available in {selectedCountry?.name} with the current filters.</p>
          <button
            onClick={handleBackToCountrySelect}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Choose Another Country
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= properties.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-green-500 mb-4">
            <Heart className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Done!</h2>
          <p className="text-gray-600 mb-6">
            You've seen all {properties.length} properties in {selectedCountry?.name}
          </p>
          
          <div className="mb-6 text-sm text-gray-600">
            <p>Liked: {likedProperties.length}</p>
            <p>Passed: {passedProperties.length}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleBackToCountrySelect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Choose Another Country
            </button>
            
            {likedProperties.length > 0 && (
              <button
                onClick={() => {
                  // Show liked properties (you can implement a modal here)
                  console.log('Liked properties:', likedProperties);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Liked Properties ({likedProperties.length})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentProperty = properties[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToCountrySelect}
              className="text-white hover:text-blue-200 transition-colors"
            >
              ← Back
            </button>
            <div className="text-center">
              <h1 className="font-semibold">{selectedCountry?.name}</h1>
              <p className="text-sm opacity-90">
                {currentIndex + 1} of {properties.length}
              </p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>

        {/* Property Card */}
        <div 
          ref={cardRef}
          className={`relative transition-transform duration-300 ${
            swipeDirection === 'left' ? 'transform -translate-x-full opacity-0' :
            swipeDirection === 'right' ? 'transform translate-x-full opacity-0' : ''
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={currentProperty.img_url}
            alt={currentProperty.title}
            className="w-full h-80 object-cover"
          />
          
          {/* Property Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h2 className="text-xl font-bold mb-2">{currentProperty.title}</h2>
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{currentProperty.location}</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400 mb-2">{currentProperty.price}</p>
            <p className="text-sm opacity-90 line-clamp-2">{currentProperty.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {currentProperty.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6">
          <div className="flex justify-center space-x-6">
            <button
              onClick={handlePass}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={handleLike}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <Heart className="h-8 w-8" />
            </button>
          </div>

          {/* Swipe Instructions */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p className="mb-2">💡 <strong>Swipe Controls:</strong></p>
            <div className="flex justify-center items-center space-x-6 text-xs">
              <div className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Swipe Left = Pass</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1" />
                <span>Swipe Right = Like</span>
              </div>
            </div>
            <p className="mt-2 text-xs">Keyboard: ← → arrows, Space (like), Esc (pass)</p>
          </div>
          
          {/* View Details Button */}
          <div className="mt-6">
            <a
              href={currentProperty.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
            >
              View Details & Contact Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}