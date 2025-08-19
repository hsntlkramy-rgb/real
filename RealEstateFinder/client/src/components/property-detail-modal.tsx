import React from 'react';
import { PropertyWithScore } from '@/lib/types';
import { X, MapPin, Phone, Mail, ExternalLink, Star, Bed, Bath, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PropertyDetailModalProps {
  property: PropertyWithScore;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  if (!isOpen) return null;

  const getPropertyImage = () => {
    if (property.img_url) return property.img_url;
    if (property.images && property.images.length > 0) return property.images[0];
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Property Details</h2>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Property Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <img
                src={getPropertyImage()}
                alt={property.title}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
                }}
              />
              {property.images && property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {property.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-20 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-4">{property.price}</div>
                
                {/* Match Score */}
                {property.matchScore && (
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-semibold">
                      {Math.round(property.matchScore * 100)}% Match
                    </span>
                  </div>
                )}
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {property.tags?.[0] || 'Residential'}
                  </span>
                </div>
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{property.bathrooms} Bathrooms</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{property.country}</span>
                </div>
              </div>

              {/* Tags */}
              {property.tags && property.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                {property.contactPhone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{property.contactPhone}</span>
                  </div>
                )}
                {property.contactEmail && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{property.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Personas */}
          {property.personas && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect For</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(property.personas).map(([persona, score]) => (
                  <div key={persona} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(score * 100)}%
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {persona.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {property.contactUrl && (
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => window.open(property.contactUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
            )}
            <Button 
              size="lg" 
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`https://maps.google.com/?q=${property.latitude},${property.longitude}`, '_blank')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
