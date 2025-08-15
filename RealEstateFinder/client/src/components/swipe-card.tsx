import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSwipe } from '../hooks/use-swipe';
import { useLocation } from 'wouter';
import { X, Heart, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface SwipeCardProps {
  property: {
    id: number;
    title: string;
    price: string;
    location: string;
    description: string;
    images: string[];
    tags: string[];
    personas: {
      remoteWorker: number;
      family: number;
      investor: number;
      retiree: number;
      luxury: number;
    };
    coordinates?: { lat: number; lng: number };
    contactUrl?: string;
    lister_url?: string;
    isActive: boolean;
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function SwipeCard({ property, onSwipe }: SwipeCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const controls = useAnimation();
  const [, setLocation] = useLocation();

  const handleSwipe = async (direction: 'left' | 'right') => {
    // Animate the card off screen
    await controls.start({
      x: direction === 'left' ? -500 : 500,
      opacity: 0,
      transition: { duration: 0.3 }
    });
    onSwipe(direction);
    // Reset position for next card
    controls.set({ x: 0, opacity: 1 });
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => handleSwipe('left'),
    onSwipeRight: () => handleSwipe('right')
  });

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      animate={controls}
      style={swipeHandlers.style}
      {...swipeHandlers.handlers}
    >
      <Card className="overflow-hidden">
        {/* Property Image */}
        <div className="relative h-96">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <h3 className="text-xl font-bold mb-2">{property.title}</h3>
            <p className="text-2xl font-bold">{property.price}</p>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                {property.location}
              </p>
              <p className="text-sm text-gray-600">{property.tags.join(', ')}</p>
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-600">{property.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => handleSwipe('left')}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-gray-300 hover:bg-gray-50"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Info className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => handleSwipe('right')}
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>

          {/* Contact Link */}
          {(property.lister_url || property.contactUrl) && (
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={() => {
                  const url = property.lister_url || property.contactUrl;
                  if (url && url.startsWith('/property/')) {
                    setLocation(url);
                  } else {
                    // Fallback for external URLs
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Property Details
              </button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}