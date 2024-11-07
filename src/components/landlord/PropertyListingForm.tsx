import React, { useState } from 'react';
import { X, Upload, Building2, MapPin, Ruler } from 'lucide-react';
import LocationSelector from '../LocationSelector';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyListingFormProps {
  onClose: () => void;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const PropertyListingForm: React.FC<PropertyListingFormProps> = ({ onClose }) => {
  const [images, setImages] = useState<FileList | null>(null);
  const [propertyType, setPropertyType] = useState('residential');
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [location, setLocation] = useState({
    region: '',
    district: '',
    ward: '',
    street: ''
  });

  const propertyTypes = {
    residential: [
      'Apartment',
      'House',
      'Villa',
      'Duplex',
      'Studio',
      'Beach House'
    ],
    commercial: [
      'Office Space',
      'Retail Shop',
      'Restaurant',
      'Hotel',
      'Shopping Mall'
    ],
    agricultural: [
      'Farm Land',
      'Ranch',
      'Plantation',
      'Greenhouse'
    ],
    industrial: [
      'Warehouse',
      'Factory',
      'Workshop',
      'Storage Facility'
    ]
  };

  const MapDrawer = () => {
    useMapEvents({
      click: (e) => {
        if (isDrawing) {
          setCoordinates([...coordinates, { lat: e.latlng.lat, lng: e.latlng.lng }]);
        }
      }
    });

    return null;
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
    if (!isDrawing) {
      setCoordinates([]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages(e.dataTransfer.files);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            {/* Property Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(propertyTypes).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                      propertyType === type
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Subtype */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                <option value="">Select property type</option>
                {propertyTypes[propertyType as keyof typeof propertyTypes].map((subtype) => (
                  <option key={subtype} value={subtype}>
                    {subtype}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                placeholder="e.g., Modern Beachfront Villa in Masaki"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                placeholder="Describe your property..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">TSh</span>
                  </div>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="block w-full pl-12 pr-4 py-2 rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Size (sq.m)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <LocationSelector
                value={location}
                onChange={setLocation}
              />
            </div>

            {/* Map for Plot Coordinates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plot Coordinates</label>
              <div className="h-[400px] rounded-lg overflow-hidden border border-gray-300">
                <MapContainer
                  center={[-6.7924, 39.2083]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapDrawer />
                  {coordinates.length > 2 && (
                    <Polygon
                      positions={coordinates.map(coord => [coord.lat, coord.lng])}
                      pathOptions={{ color: 'emerald' }}
                    />
                  )}
                </MapContainer>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={toggleDrawing}
                  className={`px-4 py-2 rounded-md ${
                    isDrawing
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  } transition-colors`}
                >
                  {isDrawing ? 'Stop Drawing' : 'Start Drawing Plot'}
                </button>
                {coordinates.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCoordinates([])}
                    className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Images
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="images-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-emerald-600">
                      Upload images
                    </span>
                    <input
                      id="images-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={(e) => setImages(e.target.files)}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">or drag and drop</p>
                </div>
                {images && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {Array.from(images).map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Add Property
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingForm;