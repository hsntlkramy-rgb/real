import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// Removed Nestoria imports as we're using local API
import { Alert } from './ui/alert';
import { Loader2 } from 'lucide-react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { PropertyWithScore } from '@/lib/types';

// Import custom house icon
import L from 'leaflet';
import houseIcon from '../assets/house-icon.png';

// Create custom icon for property markers
const propertyIcon = L.icon({
  iconUrl: houseIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

interface PropertyMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  property?: PropertyWithScore;
  properties?: any[];
  loading?: boolean;
  height?: string;
  className?: string;
}

export function PropertyMap({ 
  initialCenter = [51.505, -0.09], // London by default
  initialZoom = 13,
  property,
  properties: passedProperties,
  loading: passedLoading,
  height = '100%',
  className = ''
}: PropertyMapProps) {
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(passedLoading || false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If properties are passed as props, use those
    if (passedProperties && passedProperties.length > 0) {
      console.log('PropertyMap: Received properties:', passedProperties.length);
      setProperties(passedProperties);
      return;
    }

    // If a single property is provided, use that instead of fetching from API
    if (property) {
      if (property.coordinates) {
        setProperties([{
          title: property.title,
          priceFormatted: property.price,
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
          imageUrl: property.images?.[0],
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          propertyType: property.type
        }]);
        return;
      } else {
        setProperties([]);
        return;
      }
    }

    // Default to empty array if no properties provided
    setProperties([]);
  }, [passedProperties, property]); // Remove selectedCountry and selectedCity from dependencies

  // Calculate map center based on property or properties
  const mapCenter = property?.coordinates 
    ? [property.coordinates.lat, property.coordinates.lng] as [number, number]
    : initialCenter;

  return (
    <div className={`w-full flex flex-col ${className}`} style={{ height }}>
      {/* Only show filters if no single property is provided */}
      {!property && (
        <div className="p-4 bg-white shadow-sm">
          <div className="space-y-4">
            {/* Country and City Selection */}
            <div className="flex gap-4">
              <select 
                className="p-2 border rounded flex-1"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="All">All Countries</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CY">Cyprus</option>
                <option value="IT">Italy</option>
                <option value="UAE">UAE</option>
                <option value="ES">Spain</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
              
              <input
                type="text"
                className="p-2 border rounded flex-1"
                placeholder="Enter city name..."
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading properties...</span>
              </div>
            )}
            
            {error && (
              <Alert variant="destructive">
                {error}
              </Alert>
            )}
          </div>
        </div>
      )}

      <div className="flex-1">
        <MapContainer
          center={mapCenter}
          zoom={initialZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marker Clustering */}
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={60}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
          >
            {(() => {
              const validProperties = properties.filter(property => {
                // Filter out properties without valid coordinates
                const lat = property.latitude || property.lat || (property.coordinates && property.coordinates.lat);
                const lng = property.longitude || property.lng || (property.coordinates && property.coordinates.lng);
                return lat && lng && !isNaN(lat) && !isNaN(lng);
              });
              console.log('PropertyMap: Rendering', validProperties.length, 'valid properties out of', properties.length, 'total');
              return validProperties.map((property, index) => {
                const lat = property.latitude || property.lat || (property.coordinates && property.coordinates.lat);
                const lng = property.longitude || property.lng || (property.coordinates && property.coordinates.lng);
                const imageUrl = property.imageUrl || property.img_url || (property.images && property.images[0]);
                const price = property.priceFormatted || property.price;
                const title = property.title;
                const location = property.location;
                const description = property.description || property.summary;
                
                return (
                  <Marker
                    key={index}
                    position={[lat, lng]}
                    icon={propertyIcon}
                  >
                    <Popup>
                      <div className="max-w-xs">
                        {imageUrl && (
                          <img 
                            src={imageUrl} 
                            alt={title}
                            className="w-full h-32 object-cover mb-2 rounded"
                          />
                        )}
                        <h3 className="font-bold text-sm mb-1">{title}</h3>
                        <p className="text-lg font-semibold text-blue-600 mb-1">
                          {price}
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>{location}</p>
                          {description && (
                            <p className="mt-2 text-xs">{description}</p>
                          )}
                        </div>
                        {property.contactUrl && (
                          <button 
                            onClick={() => {
                              if (property.contactUrl && property.contactUrl.startsWith('/property/')) {
                                window.location.href = property.contactUrl;
                              } else {
                                window.open(property.contactUrl, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="block mt-2 text-xs text-blue-600 hover:underline cursor-pointer"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              });
            })()}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}