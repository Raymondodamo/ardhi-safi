import React, { useState } from 'react';
import { Plus, Search, Home, Building2, Warehouse, Trees, MapPin, DollarSign, AlertTriangle } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import LocationSelector from '../components/LocationSelector';
import PropertyListingForm from '../components/landlord/PropertyListingForm';
import Map from '../components/Map';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Properties = () => {
  const [filters, setFilters] = useState({
    type: '',
    priceMin: '',
    priceMax: '',
    location: '',
    sizeMin: '',
    sizeMax: ''
  });

  const [showListingForm, setShowListingForm] = useState(false);

  const properties = [
    {
      id: 1,
      title: 'Modern Villa in Masaki',
      type: 'Residential',
      location: 'Masaki, Dar es Salaam',
      size: 450,
      price: '850M',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      hasLegalCase: true,
      coordinates: [-6.7924, 39.2083] as [number, number]
    },
    {
      id: 2,
      title: 'Commercial Plot in CBD',
      type: 'Commercial',
      location: 'CBD, Dar es Salaam',
      size: 1200,
      price: '1.2B',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      hasLegalCase: false,
      coordinates: [-6.8163, 39.2894] as [number, number]
    }
  ];

  const propertyTypes = [
    { icon: Home, label: 'Residential' },
    { icon: Building2, label: 'Commercial' },
    { icon: Trees, label: 'Agricultural' },
    { icon: Warehouse, label: 'Industrial' }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
    <div className="p-6">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Properties</h2>
          <button
            onClick={() => setShowListingForm(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => handleFilterChange('type', label)}
                  className={`flex items-center gap-2 p-2 rounded-md border transition-colors ${
                    filters.type === label
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              />
            </div>
          </div>

          <LocationSelector 
            value={{ region: '', district: '', ward: '', street: '' }}
            onChange={() => {}}
          />
        </div>

        <button className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors">
          Apply Filters
        </button>
      </div>

      {/* Map Section */}
      <div className="mb-6 h-[400px] rounded-lg overflow-hidden shadow-md">
        <Map
          center={[-6.7924, 39.2083]}
          zoom={13}
          markers={mapMarkers}
          className="h-full w-full"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      {/* Property Listing Form Modal */}
      {showListingForm && (
        <PropertyListingForm onClose={() => setShowListingForm(false)} />
      )}
    </div>
  );
};

export default Properties;