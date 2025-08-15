import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { PropertyWithScore } from '@/lib/types';
import { PropertyModal } from '@/components/property-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Grid, Search, List } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import houseIconUrl from '@/assets/house-icon.png';
import axios from 'axios';
import { PropertyMap } from '../components/property-map';
import { properties } from '@/data/properties';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

declare global {
  interface Window {
    google: any;
  }
}

const supportedCountries = [
  { code: 'uk', name: 'United Kingdom' },
  { code: 'es', name: 'Spain' },
  { code: 'de', name: 'Germany' },
  { code: 'br', name: 'Brazil' },
  { code: 'in', name: 'India' },
  { code: 'it', name: 'Italy' },
  { code: 'fr', name: 'France' },
  { code: 'mx', name: 'Mexico' },
  { code: 'ng', name: 'Nigeria' },
  { code: 'za', name: 'South Africa' },
  { code: 'ar', name: 'Argentina' },
  { code: 'au', name: 'Australia' },
];

// Move displayPrice function above its first usage
const displayPrice = (property: any) => {
  if (typeof property.price === 'string') return property.price;
  if (property.price && typeof property.price === 'object') {
    return property.price.value || property.price.amount || property.price.listPrice || JSON.stringify(property.price);
  }
  return property.price_formatted || '';
};

// Use our client-side properties data
const allProperties: PropertyWithScore[] = properties.map(property => ({
  ...property,
  coordinates: {
    lat: property.latitude,
    lng: property.longitude
  }
}));

// Inspirational beach house images (Unsplash, royalty-free)
const beachImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
];

function MapEffect({ properties, houseIcon, selectedMarker, setSelectedMarker, markerClusterGroupRef, setSelectedProperty, setShowPropertyModal }: any) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (!Array.isArray(properties)) return;
    
    console.log('Properties to display on map:', properties);
    
    if (markerClusterGroupRef.current) {
      markerClusterGroupRef.current.clearLayers();
    }
    
    // @ts-ignore
    const markerClusterGroup = L.markerClusterGroup();
    
    properties.forEach((property: any, idx: number) => {
      // Get coordinates from our property data
      const lat = property.latitude;
      const lng = property.longitude;
      
      if (!lat || !lng) {
        console.warn('Property missing coordinates:', property);
        return;
      }
      
      const marker = L.marker([lat, lng], {
        icon: houseIcon,
        zIndexOffset: selectedMarker === idx ? 1000 : 0,
      });
      
      // Create popup content
      let imgHtml = '';
      if (property.img_url) {
        imgHtml = `<img src='${property.img_url}' alt='Property' style='width:100px;height:auto;margin-bottom:8px;border-radius:8px;' />`;
      }
      
      const popupContent = `
        <div style='min-width:200px;'>
          ${imgHtml}
          <strong>${property.title}</strong><br />
          <span style='color:#666;'>${property.location}</span><br />
          <span style='color:#2563eb;font-weight:bold;font-size:16px;'>${property.price}</span><br />
          <p style='margin:8px 0;font-size:14px;'>${property.description}</p>
          ${property.tags ? property.tags.slice(0,3).map((tag:string) => 
            `<span style='background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:12px;font-size:11px;margin-right:4px;'>${tag}</span>`
          ).join('') : ''}
        </div>
      `;
      
      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        setSelectedMarker(idx);
        setSelectedProperty({
          ...property,
          images: property.images || [property.img_url],
          tags: property.tags || [],
          description: property.description || property.title,
          personas: property.personas || {},
          matchScore: 0.8,
        });
        setShowPropertyModal(true);
      });
      
      markerClusterGroup.addLayer(marker);
    });
    
    markerClusterGroup.addTo(map);
    markerClusterGroupRef.current = markerClusterGroup;
    
    // Fit map to show all markers if there are properties
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
    
  }, [map, properties, houseIcon, selectedMarker, setSelectedMarker, markerClusterGroupRef, setSelectedProperty, setShowPropertyModal]);
  
  return null;
}

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [properties, setProperties] = useState<PropertyWithScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCountry && selectedCountry !== 'All') {
          params.append('country', selectedCountry);
        }
        
        // Use the real API endpoint
        const response = await axios.get(`/api/properties?${params.toString()}`);
        setProperties(response.data);
        console.log('Loaded properties from API:', response.data);
      } catch (error) {
        console.error('Failed to load properties:', error);
        // Fallback to client-side data if API fails
        if (selectedCountry === 'All') {
          setProperties(allProperties);
        } else {
          const countryProperties = allProperties.filter(property => 
            property.country === selectedCountry
          );
          setProperties(countryProperties);
        }
      } finally {
        setLoading(false);
      }
    };

    // Load properties immediately when component mounts
    loadProperties();
  }, [selectedCountry]);

  return (
    <div className="w-full h-screen">
      {/* Country Filter */}
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Countries</option>
          <option value="UAE">United Arab Emirates</option>
          <option value="UK">United Kingdom</option>
          <option value="USA">United States</option>
          <option value="Italy">Italy</option>
          <option value="CY">Cyprus</option>
          <option value="ES">Spain</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        
        {/* Property Count Display */}
        <div className="mt-2 text-sm text-gray-600">
          {loading ? 'Loading...' : `Showing ${properties.length} properties`}
        </div>
      </div>

      <PropertyMap 
        initialCenter={[51.505, -0.09]} // London coordinates
        initialZoom={2} // Zoom out to show world view
        properties={properties}
        loading={loading}
      />
    </div>
  );
}