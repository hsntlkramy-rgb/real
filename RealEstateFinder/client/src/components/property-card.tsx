import React, { useState } from 'react';
import { PropertyWithScore } from '@/lib/types';
import { useSwipe } from '@/hooks/use-swipe';
import { Heart, X, Eye, MapPin, Bed, Bath } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyWithScore;
  onLike: () => void;
  onPass: () => void;
  onDetails: () => void;
}

export function PropertyCard({ property, onLike, onPass, onDetails }: PropertyCardProps) {
  const [showIndicator, setShowIndicator] = useState<'like' | 'pass' | null>(null);

  const { handlers, style } = useSwipe({
    onSwipeLeft: () => {
      setShowIndicator('pass');
      setTimeout(() => {
        onPass();
        setShowIndicator(null);
      }, 300);
    },
    onSwipeRight: () => {
      setShowIndicator('like');
      setTimeout(() => {
        onLike();
        setShowIndicator(null);
      }, 300);
    },
    threshold: 80
  });

  // Get the best available image
  const getPropertyImage = () => {
    if (property.img_url) return property.img_url;
    if (property.images && property.images.length > 0) return property.images[0];
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing select-none transform-gpu"
      style={{
        ...style,
        touchAction: 'none', // Prevents default touch behaviors
      }}
      {...handlers}
    >
      {/* Action Indicator */}
      {showIndicator && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          {showIndicator === 'like' ? (
            <div className="bg-green-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg animate-pulse">
              ❤️ LIKE
            </div>
          ) : (
            <div className="bg-red-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg animate-pulse">
              ❌ PASS
            </div>
          )}
        </div>
      )}

      {/* Property Image */}
      <div className="relative h-80">
        <img
          src={getPropertyImage()}
          alt={property.title}
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Country Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
          {property.country === 'UK' ? '🇬🇧 UK' : '🇦🇪 UAE'}
        </div>

        {/* Match Score Badge */}
        {property.matchScore && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-lg">
            {Math.round((property.matchScore || 0) * 100)}% Match
          </div>
        )}

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <h3 className="text-white text-2xl font-bold mb-2 line-clamp-2">{property.title}</h3>
          <div className="flex items-center mb-3 text-white/90">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">{property.location}</span>
          </div>
          <p className="text-white text-3xl font-bold mb-3">{property.price}</p>
          
          {/* Property Features */}
          <div className="flex items-center gap-4 mb-4 text-white/90">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} BR</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} Bath</span>
              </div>
            )}
          </div>
          
          <p className="text-white/90 text-sm line-clamp-2 mb-4">{property.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {property.tags && property.tags.length > 0 ? (
              property.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                {property.country}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-white">
        <div className="flex gap-4 justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowIndicator('pass');
              setTimeout(() => {
                onPass();
                setShowIndicator(null);
              }, 300);
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <X className="h-6 w-6 mx-auto" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetails();
            }}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Eye className="h-6 w-6 mx-auto" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowIndicator('like');
              setTimeout(() => {
                onLike();
                setShowIndicator(null);
              }, 300);
            }}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Heart className="h-6 w-6 mx-auto" />
          </button>
        </div>
        
        {/* Swipe Instructions */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>💡 Swipe left to pass, right to like, or use the buttons above</p>
        </div>
      </div>
    </div>
  );
}
