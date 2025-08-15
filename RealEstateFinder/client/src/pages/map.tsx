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
    console.log('Fetched properties:', properties);
    // Add a manual marker for debugging
    L.marker([51.5074, -0.1278], { icon: houseIcon }).addTo(map);
    if (markerClusterGroupRef.current) {
      markerClusterGroupRef.current.clearLayers();
    }
    // @ts-ignore
    const markerClusterGroup = L.markerClusterGroup();
    properties.forEach((property: any, idx: number) => {
      // Support both mock and Nestoria property formats
      const lat = property.latitude || property.lat || (property.location && property.location.latitude);
      const lng = property.longitude || property.lng || (property.location && property.location.longitude);
      if (!lat || !lng) return;
      const marker = L.marker([lat, lng], {
        icon: houseIcon,
        zIndexOffset: selectedMarker === idx ? 1000 : 0,
      });
      let imgHtml = '';
      const imgUrl = property.img_url || property.img_url || property.img_url || property.img_url || (property.img_url || property.img_url);
      if (imgUrl) {
        imgHtml = `<img src='${imgUrl}' alt='Property' style='width:100px;height:auto;margin-bottom:8px;border-radius:8px;' />`;
      }
      let contactHtml = '';
      if (property.contact) {
        contactHtml = `<div style='margin-top:6px;font-size:12px;'><strong>Contact:</strong> <a href='tel:${property.contact}'>${property.contact}</a></div>`;
      }
      marker.bindPopup(`
        <div style='min-width:180px;'>
          ${imgHtml}
          <strong>${property.title || property.property_type || property.summary}</strong><br />
          ${typeof property.location === 'string' ? property.location : property.location ? `${property.location.latitude}, ${property.location.longitude}` : ''}<br />
          <span style='color:#2563eb;font-weight:bold;'>${displayPrice(property)}</span><br />
          ${property.keywords ? property.keywords.split(',').slice(0,2).map((tag:string) => `<span style='background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:12px;font-size:11px;margin-right:4px;'>${tag}</span>`).join('') : ''}
          ${contactHtml}
          <br />
          <a href='${property.lister_url || property.lister_url || property.details_url || '#'}' target='_blank' rel='noopener noreferrer' style='background:#2563eb;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;margin-top:8px;display:inline-block;text-decoration:none;'>View Listing</a>
        </div>
      `);
      marker.on('click', () => {
        setSelectedMarker(idx);
        // Ensure images array is always present and valid
        let images = Array.isArray(property.images) ? property.images.filter(Boolean) : [];
        if (images.length === 0 && property.img_url) images = [property.img_url];
        setSelectedProperty({
          ...property,
          price: property.price_formatted || property.price || '',
          images,
          tags: property.keywords ? property.keywords.split(',') : [],
          description: property.title || property.property_type || property.summary || '',
          personas: {},
          matchScore: 0.8,
          location: typeof property.location === 'string' ? property.location : property.location ? `${property.location.latitude}, ${property.location.longitude}` : '',
        });
        setShowPropertyModal(true);
      });
      markerClusterGroup.addLayer(marker);
    });
    markerClusterGroup.addTo(map);
    markerClusterGroupRef.current = markerClusterGroup;
  }, [map, properties, houseIcon, selectedMarker, setSelectedMarker, markerClusterGroupRef, setSelectedProperty, setShowPropertyModal]);
  return null;
}

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCountry && selectedCountry !== 'All') {
          params.append('country', selectedCountry);
        }
        
        const response = await axios.get(`/api/properties?${params.toString()}`);
        setProperties(response.data);
      } catch (error) {
        console.error('Failed to load properties:', error);
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
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CY">Cyprus</option>
          <option value="IT">Italy</option>
          <option value="UAE">UAE</option>
          <option value="ES">Spain</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      <PropertyMap 
        initialCenter={[51.505, -0.09]} // London coordinates
        initialZoom={13}
        properties={properties}
        loading={loading}
      />
    </div>
  );
}