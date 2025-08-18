import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/data/properties';

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  img_url: string;
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
  contactPhone?: string;
  contactEmail?: string;
  propertyType?: string;
  amenities?: string[];
}

export default function PropertyDetailPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const propertyId = pathParts[pathParts.length - 1];
    
    if (propertyId) {
      fetchProperty(propertyId);
    }
  }, []);

  const fetchProperty = async (id: string) => {
    try {
      setLoading(true);
      const propertyData = await api.getPropertyById(parseInt(id));
      if (propertyData) {
        setProperty(propertyData);
      } else {
        toast({
          title: "Property not found",
          description: "The property you're looking for doesn't exist.",
          variant: "destructive",
        });
        setLocation('/');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to load property details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    toast({
      title: "Property liked!",
      description: "This property has been added to your favorites.",
    });
  };

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Button onClick={() => setLocation('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setLocation('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Properties
            </Button>
            <Button onClick={handleLike} variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Like
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
              {property.images && property.images.length > 0 ? (
                <>
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      >
                        ‹
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        ›
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{property.price}</div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Personas */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Perfect For</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(property.personas).map(([persona, score]) => (
                  <div key={persona} className="flex items-center justify-between">
                    <span className="capitalize text-gray-600">
                      {persona.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                {property.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{property.contactPhone}</span>
                  </div>
                )}
                {property.contactEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{property.contactEmail}</span>
                  </div>
                )}
                {property.contactUrl && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <button
                      onClick={() => {
                        if (property.contactUrl && property.contactUrl.startsWith('/property/')) {
                          window.location.href = property.contactUrl;
                        } else {
                          window.open(property.contactUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1" size="lg">
                Contact Agent
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Schedule Viewing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
