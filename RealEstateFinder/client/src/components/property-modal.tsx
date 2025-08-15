import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from '@/components/ui/progress';
import { PropertyMap } from './property-map';
import { PropertyWithScore } from '@/lib/types';
import { X, MapPin, Heart, Timer } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { io } from 'socket.io-client';
import React from 'react';

interface PropertyModalProps {
  property: PropertyWithScore | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

export function PropertyModal({ property, isOpen, onClose, onLike, onPass }: PropertyModalProps) {
  if (!property) return null;

  const handleLike = () => {
    onLike();
    onClose();
  };

  const handlePass = () => {
    onPass();
    onClose();
  };

  // --- Chat widget state and logic ---
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string; timestamp: string }[]>([]);
  const [socket, setSocket] = useState<any>(null);

  // Connect to Socket.io when modal opens
  React.useEffect(() => {
    if (isOpen && property) {
      const s = io('/', { transports: ['websocket'] });
      setSocket(s);
      const roomId = `property-${property.id}`;
      s.emit('joinRoom', roomId);
      s.on('chatMessage', (msg) => {
        setChatMessages((prev) => [...prev, msg]);
      });
      return () => {
        s.disconnect();
      };
    }
  }, [isOpen, property]);

  const handleSendMessage = () => {
    if (socket && chatInput.trim()) {
      const msg = { roomId: `property-${property.id}`, message: chatInput, sender: 'User' };
      socket.emit('chatMessage', msg);
      setChatInput('');
    }
  };
  // --- End chat widget logic ---

  const displayPrice = (property: any) => {
    if (typeof property.price === 'string') return property.price;
    if (property.price && typeof property.price === 'object') {
      return property.price.value || property.price.amount || property.price.listPrice || JSON.stringify(property.price);
    }
    return property.price_formatted || '';
  };

  const displayLocation = (property: any) => {
    if (typeof property.location === 'string') return property.location;
    if (property.location && typeof property.location === 'object') {
      return property.location.latitude && property.location.longitude
        ? `${property.location.latitude}, ${property.location.longitude}`
        : JSON.stringify(property.location);
    }
    return '';
  };

  // Add console logs to verify contact information
  console.log('Contact URL:', property.contactUrl);
  console.log('Contact Phone:', property.contactPhone);
  console.log('Contact Email:', property.contactEmail);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{property.title}</DialogTitle>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Main Property Image */}
          {property.images && property.images.length > 0 && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-72 object-cover rounded-t-lg mb-4"
              style={{ maxHeight: 320 }}
            />
          )}

          {/* Property Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-1 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {displayLocation(property)}
              </p>
              <p className="text-primary font-bold text-xl">{displayPrice(property)}</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white px-4 py-2 rounded-full text-lg font-bold">
                {Math.round((property.matchScore || 0) * 100)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Match Score</div>
            </div>
          </div>

          {/* Lifestyle Tags */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Lifestyle Tags</h3>
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Persona Match */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Persona Match</h3>
            <div className="space-y-2">
              {Object.entries(property.personas).map(([persona, score]) => {
                const personaName = persona
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())
                  .trim();
                
                return (
                  <div key={persona} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{personaName}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <Progress value={score * 100} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 w-10 text-right">
                        {Math.round(score * 100)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location Map */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <PropertyMap property={property} height="250px" />
            </div>
          </div>

          {/* Contact Information */}
          {(property.contactUrl || property.lister_url || property.contactPhone || property.contactEmail) && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
              {/* Always show property link first if available - prioritize actual listing URLs */}
              {(property.lister_url || property.contactUrl) && (
                <div className="mb-2">
                  <button
                    onClick={() => {
                      const url = property.lister_url || property.contactUrl;
                      if (url && url.startsWith('/property/')) {
                        // Close modal and navigate to property detail page
                        onClose();
                        window.location.href = url;
                      } else if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                        // Open external URLs in new tab
                        window.open(url, '_blank', 'noopener,noreferrer');
                      } else if (url && url.startsWith('www.')) {
                        // Handle URLs without protocol
                        window.open(`https://${url}`, '_blank', 'noopener,noreferrer');
                      } else if (url) {
                        // For any other URL format, try to open it
                        try {
                          window.open(url, '_blank', 'noopener,noreferrer');
                        } catch (error) {
                          console.error('Error opening URL:', error);
                        }
                      }
                    }}
                    className="text-primary hover:underline font-semibold text-base cursor-pointer"
                  >
                    View Property Listing
                  </button>
                </div>
              )}
              {/* For UAE, never show phone, only the link */}
              {property.location && typeof property.location === 'string' && property.location.toLowerCase().includes('uae') ? null : (
                <>
              {property.contactPhone && (
                <p className="text-gray-600 text-sm mb-2">
                  <b>Phone:</b> <a href={`tel:${property.contactPhone}`} className="text-primary hover:underline">{property.contactPhone}</a>
                </p>
              )}
                </>
              )}
              {property.contactEmail && (
                <p className="text-gray-600 text-sm mb-2">
                  <b>Email:</b> <a href={`mailto:${property.contactEmail}`} className="text-primary hover:underline">{property.contactEmail}</a>
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handlePass}
              className="flex-1 py-3 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <Timer className="h-4 w-4 mr-2" />
              Pass
            </Button>
            <Button
              onClick={handleLike}
              className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white"
            >
              <Heart className="h-4 w-4 mr-2" />
              Like Property
            </Button>
          </div>

          {/* Chat Widget */}
          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Chat with Agent</h3>
            <div className="h-40 overflow-y-auto bg-gray-50 rounded p-2 mb-2 border">
              {chatMessages.length === 0 && <div className="text-gray-400 text-sm">No messages yet.</div>}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="mb-1">
                  <span className="font-bold text-xs text-blue-700">{msg.sender}:</span> <span className="text-sm">{msg.message}</span>
                  <span className="text-xs text-gray-400 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1"
                placeholder="Type your message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
              />
              <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">Send</Button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600 border-t">
          BlissMatch helps you discover lifestyle-aligned properties. Transactions occur outside the platform.
        </div>
      </DialogContent>
    </Dialog>
  );
}
