import React, { useState, useEffect, useRef } from 'react';
import { PropertyWithScore } from '../lib/types';
import { Heart, X, MapPin, Home, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import cyprusProperties from '../cyprus-properties.json';

export default function SwipePage() {
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string } | null>({ code: 'CY', name: 'Cyprus' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<'country-select' | 'swipe'>('swipe');
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
    { code: 'CY', name: 'Cyprus' }
  ];

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

  // Load Cyprus properties and filter by price if needed
  const allProperties = cyprusProperties.map(convertToPropertyWithScore);
  const properties = allProperties.filter(property => {
    if (!minPrice && !maxPrice) return true;
    
    const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
    if (minPrice && price < parseFloat(minPrice)) return false;
    if (maxPrice && price > parseFloat(maxPrice)) return false;
    return true;
  });

  const loading = false; // No loading needed for local data

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
    
    // Add visual feedback
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
      cardRef.current.style.cursor = 'grabbing';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    
    const diffX = touchStartX.current - touchCurrentX;
    const diffY = touchStartY.current - touchCurrentY;
    
    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 15) {
      e.preventDefault();
      
      // Add real-time visual feedback during swipe
      if (cardRef.current) {
        const rotation = (diffX / 15) * (diffX > 0 ? 1 : -1);
        const opacity = Math.max(0.2, 1 - Math.abs(diffX) / 250);
        const scale = Math.max(0.8, 1 - Math.abs(diffX) / 500);
        cardRef.current.style.transform = `translateX(${-diffX}px) rotate(${rotation}deg) scale(${scale})`;
        cardRef.current.style.opacity = opacity.toString();
        
        // Add swipe direction hint
        if (diffX > 50) {
          cardRef.current.style.borderLeft = '4px solid #ef4444';
        } else if (diffX < -50) {
          cardRef.current.style.borderRight = '4px solid #22c55e';
        }
      }
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
    
    // Reset card position and style
    if (cardRef.current) {
      cardRef.current.style.transition = 'all 0.3s ease';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '';
      cardRef.current.style.cursor = 'grab';
    }
    
    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
      cardRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStartX.current) return;
    
    const diffX = touchStartX.current - e.clientX;
    const diffY = touchStartX.current - e.clientY;
    
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 15) {
      if (cardRef.current) {
        const rotation = (diffX / 15) * (diffX > 0 ? 1 : -1);
        const opacity = Math.max(0.2, 1 - Math.abs(diffX) / 250);
        const scale = Math.max(0.8, 1 - Math.abs(diffX) / 500);
        cardRef.current.style.transform = `translateX(${-diffX}px) rotate(${rotation}deg) scale(${scale})`;
        cardRef.current.style.opacity = opacity.toString();
        
        // Add swipe direction hint
        if (diffX > 50) {
          cardRef.current.style.borderLeft = '4px solid #ef4444';
        } else if (diffX < -50) {
          cardRef.current.style.borderRight = '4px solid #22c55e';
        }
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!touchStartX.current) return;
    
    const diffX = touchStartX.current - e.clientX;
    const diffY = touchStartX.current - e.clientY;
    
    const minSwipeDistance = 100;
    
    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        setSwipeDirection('left');
        setTimeout(() => {
          handlePass();
          setSwipeDirection(null);
        }, 300);
      } else {
        setSwipeDirection('right');
        setTimeout(() => {
          handleLike();
          setSwipeDirection(null);
        }, 300);
      }
    }
    
    // Reset card position and style
    if (cardRef.current) {
      cardRef.current.style.transition = 'all 0.3s ease';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '';
      cardRef.current.style.cursor = 'grab';
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
          setSwipeDirection('right');
          setTimeout(() => {
            handleLike();
            setSwipeDirection(null);
          }, 300);
          break;
        case 'Escape':
          e.preventDefault();
          setSwipeDirection('left');
          setTimeout(() => {
            handlePass();
            setSwipeDirection(null);
          }, 300);
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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 z-20 relative">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={handleBackToCountrySelect}
            className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
          >
            ← Back
          </button>
          <div className="text-center">
            <h1 className="font-bold text-lg text-white">{selectedCountry?.name}</h1>
            <p className="text-sm text-white/80">
              {currentIndex + 1} of {properties.length}
            </p>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Property Card - Full Screen Tinder Style */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={cardRef}
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            swipeDirection === 'left' ? 'transform -translate-x-full opacity-0 scale-95' :
            swipeDirection === 'right' ? 'transform translate-x-full opacity-0 scale-95' : ''
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'pan-y'
          }}
        >
          {/* Full Screen Image */}
          <img
            src={currentProperty.img_url}
            alt={currentProperty.title}
            className="w-full h-full object-cover"
          />
          
          {/* Swipe Direction Indicators */}
          <div className="absolute top-6 left-6 z-10">
            {swipeDirection === 'left' && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse shadow-lg">
                PASS ❌
              </div>
            )}
            {swipeDirection === 'right' && (
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse shadow-lg">
                LIKE ❤️
              </div>
            )}
          </div>
          
          {/* Property Info Overlay - Tinder Style */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 text-white">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold mb-4 leading-tight">{currentProperty.title}</h2>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 mr-3 text-blue-300" />
                <span className="text-lg font-medium">{currentProperty.location}</span>
              </div>
              <p className="text-4xl font-bold text-yellow-400 mb-4">{currentProperty.price}</p>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">{currentProperty.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                {currentProperty.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Tinder Style */}
      <div className="bg-black/20 backdrop-blur-md border-t border-white/20 p-6">
        <div className="flex justify-center space-x-12 max-w-md mx-auto">
          <button
            onClick={handlePass}
            className="w-16 h-16 bg-white hover:bg-gray-100 text-red-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform border-2 border-red-500"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={handleLike}
            className="w-16 h-16 bg-white hover:bg-gray-100 text-green-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform border-2 border-green-500"
          >
            <Heart className="h-8 w-8" />
          </button>
        </div>

        {/* Swipe Instructions - Minimal Tinder Style */}
        <div className="mt-4 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white/80 font-medium mb-2">💡 Swipe Controls</p>
            <div className="flex justify-center items-center space-x-6 text-sm text-white/70">
              <div className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1 text-red-400" />
                <span>Swipe Left = Pass</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 text-green-400" />
                <span>Swipe Right = Like</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-white/60">Keyboard: ← → arrows, Space (like), Esc (pass)</p>
          </div>
        </div>
        
        {/* View Details Button - Tinder Style */}
        <div className="mt-4">
          <a
            href={currentProperty.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white hover:bg-gray-100 text-black text-center py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/30"
          >
            View Details & Contact Agent
          </a>
        </div>
      </div>
    </div>
  );
}