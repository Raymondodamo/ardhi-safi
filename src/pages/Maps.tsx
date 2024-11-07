import React, { useState, useEffect } from 'react';
import { Building2, DollarSign, Ruler, AlertTriangle, MapPin } from 'lucide-react';
import Map from '../components/Map';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Maps = () => {
  const [activeProperty, setActiveProperty] = useState<number | null>(null);
  const [mapKey, setMapKey] = useState(0);

  // Force map remount when component mounts
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, []);

  const properties = [
    {
      id: 1,
      title: 'Modern Villa in Masaki',
      type: 'Residential',
      location: 'Masaki, Dar es Salaam',
      size: 450,
      price: '850M',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      coordinates: [-6.7924, 39.2083] as [number, number],
      hasLegalCase: true
    },
    {
      id: 2,
      title: 'Commercial Plot in CBD',
      type: 'Commercial',
      location: 'CBD, Dar es Salaam',
      size: 1200,
      price: '1.2B',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      coordinates: [-6.8163, 39.2894] as [number, number]
    }
  ];

  // Custom marker icon based on property type
  const getMarkerIcon = (type: string, hasLegalCase: boolean) => {
    const iconColor = hasLegalCase ? '#ef4444' : '#059669';
    const iconSvg = type === 'Commercial' 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${iconColor}"><path d="M3 21h18v-3H3v3zm0-4h18v-3H3v3zm0-4h18v-3H3v3zm0-4h18V6H3v3zm0-4h18V2H3v3z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${iconColor}"><path d="M12 3L4 9v12h16V9l-8-6zm0 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

    const iconUrl = `data:image/svg+xml;base64,${btoa(iconSvg)}`;
    
    return L.divIcon({
      html: `<div style="background-color: white; border-radius: 50%; padding: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
              <img src="${iconUrl}" width="24" height="24" />
            </div>`,
      className: 'custom-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });
  };

  const mapMarkers = properties.map(property => ({
    id: property.id,
    position: property.coordinates,
    icon: getMarkerIcon(property.type, property.hasLegalCase),
    popupContent: (
      <div className="w-64">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <div className="p-3">
          <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
          <div className="space-y-1 text-sm">
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </p>
            <p className="flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              {property.type}
            </p>
            <p className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              TSh {property.price}
            </p>
            {property.hasLegalCase && (
              <p className="flex items-center text-red-600">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Legal Case Pending
              </p>
            )}
          </div>
          <button 
            className="mt-3 w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    )
  }));

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Property Map</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-[calc(100vh-200px)] w-full">
            <Map
              key={mapKey}
              center={[-6.7924, 39.2083]}
              zoom={13}
              markers={mapMarkers}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;