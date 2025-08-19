import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PropertyWithScore } from '../lib/types';
import { PropertyCard } from '../components/property-card';
import { api } from '../data/properties-simple';
import { MapPin, Heart, X, ArrowLeft, Eye, Home, ArrowRight } from 'lucide-react';

export default function SwipePage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('UAE');
  const [currentStep, setCurrentStep] = useState<'select' | 'swipe'>('select');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());
  const [passedProperties, setPassedProperties] = useState<Set<number>>(new Set());
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Refs for touch handling
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const countries = [
    { code: 'UK', name: 'United Kingdom' },
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'Cyprus', name: 'Cyprus' },
    { code: 'US', name: 'United States' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }
  ];

  // Fetch properties based on selected country
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['swipe-properties', selectedCountry],
    queryFn: async () => {
      console.log('=== SWIPE PAGE DEBUG ===');
      console.log('Selected country:', selectedCountry);
      
      try {
        if (selectedCountry === 'UAE') {
          // Use UAE API
          return api.getPropertiesByCountry('UAE');
        } else if (selectedCountry === 'UK') {
          // Use UK API
          return api.getPropertiesByCountry('UK');
        } else {
          // Use mock data for other countries
          return api.getPropertiesByCountry(selectedCountry);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  // Get properties for current country
  const currentCountryProperties = useMemo(() => {
    if (selectedCountry === 'UAE') {
      return properties.filter(p => p.country === 'UAE');
    } else if (selectedCountry === 'UK') {
      return properties.filter(p => p.country === 'UK');
    }
    return properties;
  }, [properties, selectedCountry]);

  const handleCountrySelect = (country: { code: string; name: string }) => {
    setSelectedCountry(country.code);
    setCurrentStep('swipe');
    setCurrentIndex(0);
    setLikedProperties(new Set());
    setPassedProperties(new Set());
  };

  const handleLike = () => {
    if (currentIndex < currentCountryProperties.length) {
      const property = currentCountryProperties[currentIndex];
      setLikedProperties(prev => new Set([...Array.from(prev), property.id]));
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < currentCountryProperties.length) {
      const property = currentCountryProperties[currentIndex];
      setPassedProperties(prev => new Set([...Array.from(prev), property.id]));
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
      if (currentStep !== 'swipe' || currentIndex >= currentCountryProperties.length) return;
      
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
  }, [currentStep, currentIndex, currentCountryProperties.length]);

  const handleBackToCountrySelect = () => {
    setCurrentStep('select');
    setSelectedCountry('UAE'); // Reset to default
    setCurrentIndex(0);
    setLikedProperties(new Set());
    setPassedProperties(new Set());
  };

  // Get country name for display
  const getCountryName = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    return country ? country.name : countryCode;
  };

  if (currentStep === 'select') {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties from {getCountryName(selectedCountry)}...</p>
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

  if (currentCountryProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-gray-400 mb-4">
            <Home className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Properties Found</h2>
          <p className="text-gray-600 mb-6">No properties available in {getCountryName(selectedCountry)} with the current filters.</p>
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

  if (currentIndex >= currentCountryProperties.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-green-500 mb-4">
            <Heart className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Done!</h2>
          <p className="text-gray-600 mb-6">
            You've seen all {currentCountryProperties.length} properties in {getCountryName(selectedCountry)}
          </p>
          
          <div className="mb-6 text-sm text-gray-600">
            <p>Liked: {likedProperties.size}</p>
            <p>Passed: {passedProperties.size}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleBackToCountrySelect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Choose Another Country
            </button>
            
            {likedProperties.size > 0 && (
              <button
                onClick={() => {
                  // Show liked properties (you can implement a modal here)
                  console.log('Liked properties:', likedProperties);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Liked Properties ({likedProperties.size})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentProperty = currentCountryProperties[currentIndex];

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
              <h1 className="font-semibold">{getCountryName(selectedCountry)}</h1>
              <p className="text-sm opacity-90">
                {currentIndex + 1} of {currentCountryProperties.length}
              </p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{currentCountryProperties.length}</div>
            <div className="text-sm text-gray-600">Total Properties</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{likedProperties.size}</div>
            <div className="text-sm text-gray-600">❤️ Liked</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
            <div className="text-2xl font-bold text-red-600">{passedProperties.size}</div>
            <div className="text-sm text-gray-600">❌ Passed</div>
          </div>
        </div>

        {/* Property Card */}
        <div className="relative max-w-md mx-auto">
          <PropertyCard
            property={currentProperty}
            onLike={handleLike}
            onPass={handlePass}
            onDetails={() => {
              // Handle property details view
              console.log('View details for:', currentProperty.title);
            }}
          />
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