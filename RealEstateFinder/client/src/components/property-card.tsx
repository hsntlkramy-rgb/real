import { useState } from 'react';
import { PropertyWithScore } from '@/lib/types';
import { useSwipe } from '@/hooks/use-swipe';

interface PropertyCardProps {
  property: PropertyWithScore;
  onLike: () => void;
  onPass: () => void;
  onDetails: () => void;
}

export function PropertyCard({ property, onLike, onPass, onDetails }: PropertyCardProps) {
  const [transform, setTransform] = useState({ x: 0, rotation: 0, opacity: 1 });
  const [showIndicator, setShowIndicator] = useState<'like' | 'pass' | null>(null);

  const swipeHandlers = useSwipe({
    onSwipeMove: (x, rotation) => {
      const opacity = Math.max(0.5, 1 - Math.abs(x) / 200);
      setTransform({ x, rotation, opacity });

      if (x > 50) {
        setShowIndicator('like');
      } else if (x < -50) {
        setShowIndicator('pass');
      } else {
        setShowIndicator(null);
      }
    },
    onSwipeRight: () => {
      setTransform({ x: window.innerWidth, rotation: 30, opacity: 0 });
      setTimeout(onLike, 300);
    },
    onSwipeLeft: () => {
      setTransform({ x: -window.innerWidth, rotation: -30, opacity: 0 });
      setTimeout(onPass, 300);
    },
    onSwipeEnd: () => {
      setTransform({ x: 0, rotation: 0, opacity: 1 });
      setShowIndicator(null);
    }
  });

  return (
    <div
      className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translateX(${transform.x}px) rotate(${transform.rotation}deg)`,
        opacity: transform.opacity,
        transition: transform.x === 0 ? 'all 0.3s ease-out' : 'none',
      }}
      {...swipeHandlers}
    >
      {/* Action Indicator */}
      {showIndicator && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          {showIndicator === 'like' ? (
            <div className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold">
              <i className="fas fa-heart mr-2"></i>LIKE
            </div>
          ) : (
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold">
              <i className="fas fa-times mr-2"></i>PASS
            </div>
          )}
        </div>
      )}

      {/* Property Image */}
      <div className="relative h-2/3">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Match Score Badge */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary">
          {Math.round((property.matchScore || 0) * 100)}% Match
        </div>

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-white text-xl font-bold mb-1">{property.title}</h3>
          <p className="text-white/90 text-sm mb-2">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {property.location}
          </p>
          <p className="text-white font-bold text-lg">{property.price}</p>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 h-1/3 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 mb-3">
          {property.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 flex-1">
          {property.description}
        </p>
        
        {/* Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetails();
          }}
          className="mt-2 text-primary text-sm font-medium hover:underline self-start"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
