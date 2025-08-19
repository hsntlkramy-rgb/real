import React, { useState } from 'react';
import { PropertyWithScore } from '@/lib/types';
import { X, Home, MapPin, DollarSign, Bed, Bath, Square, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PropertyComparisonProps {
  properties: PropertyWithScore[];
  onClose: () => void;
  onRemoveProperty: (propertyId: number) => void;
}

export function PropertyComparison({ properties, onClose, onRemoveProperty }: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<PropertyWithScore[]>(properties);

  const handleRemoveProperty = (propertyId: number) => {
    const updated = selectedProperties.filter(p => p.id !== propertyId);
    setSelectedProperties(updated);
    onRemoveProperty(propertyId);
  };

  if (selectedProperties.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>No Properties to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Add some properties to compare them side by side.</p>
            <Button onClick={onClose} className="w-full">Close</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Compare Properties ({selectedProperties.length})</h2>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Property Headers */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              {selectedProperties.map((property) => (
                <div key={property.id} className="border-r last:border-r-0">
                  <div className="p-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProperty(property.id)}
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    
                    {/* Property Image */}
                    <div className="relative mb-4">
                      <img
                        src={property.img_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                      <Badge className="absolute top-2 left-2">{property.country}</Badge>
                    </div>

                    {/* Property Title */}
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
                    
                    {/* Price */}
                    <p className="text-2xl font-bold text-blue-600 mb-2">{property.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Property Details */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              {/* Location */}
              <div className="bg-gray-50 p-4 font-medium border-r">Location</div>
              {selectedProperties.map((property) => (
                <div key={`location-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{property.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Property Type */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Property Type</div>
              {selectedProperties.map((property) => (
                <div key={`type-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-gray-500" />
                    <span>{property.tags?.[0] || 'Residential'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bedrooms */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Bedrooms</div>
              {selectedProperties.map((property) => (
                <div key={`bedrooms-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-gray-500" />
                    <span>{property.bedrooms || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bathrooms */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Bathrooms</div>
              {selectedProperties.map((property) => (
                <div key={`bathrooms-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-gray-500" />
                    <span>{property.bathrooms || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Match Score */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Match Score</div>
              {selectedProperties.map((property) => (
                <div key={`score-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{Math.round((property.matchScore || 0) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Description</div>
              {selectedProperties.map((property) => (
                <div key={`description-${property.id}`} className="p-4 border-r last:border-r-0">
                  <p className="text-sm text-gray-600 line-clamp-3">{property.description}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Features</div>
              {selectedProperties.map((property) => (
                <div key={`tags-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="flex flex-wrap gap-1">
                    {property.tags && property.tags.length > 0 ? (
                      property.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        {property.country}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
              <div className="bg-gray-50 p-4 font-medium border-r">Actions</div>
              {selectedProperties.map((property) => (
                <div key={`actions-${property.id}`} className="p-4 border-r last:border-r-0">
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(property.contactUrl, '_blank')}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open(`https://maps.google.com/?q=${property.latitude},${property.longitude}`, '_blank')}
                    >
                      View on Map
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
