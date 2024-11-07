import React, { useState, useEffect } from 'react';
import { Home, Building2, Bell, FileText, Search, MapPin, Calendar, Download } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import UtilityTracker from '../components/landlord/UtilityTracker';
import ScheduleViewer from '../components/tenant/ScheduleViewer';

interface Property {
  id: number;
  title: string;
  type: string;
  location: string;
  price: string;
  image: string;
  coordinates: [number, number];
  isPlot?: boolean;
  plotCoordinates?: [number, number][];
}

const Tenants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rented' | 'available' | 'utilities' | 'documents'>('rented');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showUtilityTracker, setShowUtilityTracker] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const properties: Property[] = [
    {
      id: 1,
      title: 'Modern Apartment in Masaki',
      type: 'Apartment',
      location: 'Masaki, Dar es Salaam',
      price: 'TSh 1.2M/month',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      coordinates: [-6.7924, 39.2083]
    },
    {
      id: 2,
      title: 'Plot in Mbezi Beach',
      type: 'Land',
      location: 'Mbezi Beach, Dar es Salaam',
      price: 'TSh 150M',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      coordinates: [-6.7724, 39.2183],
      isPlot: true,
      plotCoordinates: [
        [-6.7724, 39.2183],
        [-6.7734, 39.2193],
        [-6.7744, 39.2173],
        [-6.7724, 39.2183]
      ]
    }
  ];

  const handleTabChange = (tab: 'rented' | 'available' | 'utilities' | 'documents') => {
    setActiveTab(tab);
    if (tab === 'utilities') {
      setShowUtilityTracker(true);
    } else if (tab !== 'available') {
      setShowMap(false);
    }
  };

  const handleViewSchedule = (property: Property) => {
    setSelectedProperty(property);
    setShowSchedule(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'rented':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 1).map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-emerald-600 font-medium mt-2">{property.price}</p>
                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleViewSchedule(property)}
                      className="flex items-center text-sm text-gray-600 hover:text-emerald-600"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      View Schedule
                    </button>
                    <button className="flex items-center text-sm text-gray-600 hover:text-emerald-600">
                      <Download className="h-4 w-4 mr-1" />
                      Documents
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'available':
        return (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setShowMap(!showMap)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
            
            {showMap && (
              <div className="h-[600px] mb-6 rounded-lg overflow-hidden shadow-md">
                <MapContainer
                  center={[-6.7924, 39.2083]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {properties.map(property => (
                    <React.Fragment key={property.id}>
                      <Marker position={property.coordinates}>
                        <Popup>
                          <div className="p-2">
                            <img src={property.image} alt={property.title} className="w-full h-32 object-cover mb-2 rounded" />
                            <h3 className="font-semibold">{property.title}</h3>
                            <p className="text-sm text-gray-600">{property.location}</p>
                            <p className="text-sm font-medium text-emerald-600">{property.price}</p>
                          </div>
                        </Popup>
                      </Marker>
                      {property.isPlot && property.plotCoordinates && (
                        <Polygon
                          positions={property.plotCoordinates}
                          pathOptions={{ color: 'emerald', fillColor: 'emerald' }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <p className="text-gray-600">{property.location}</p>
                    <p className="text-emerald-600 font-medium mt-2">{property.price}</p>
                    <button className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
                      Contact Owner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-4">
              {['Lease Agreement', 'Rent Receipts', 'Property Inspection Report'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-4 border rounded-lg">
                  <span>{doc}</span>
                  <button className="flex items-center text-emerald-600 hover:text-emerald-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange('rented')}
              className={`${
                activeTab === 'rented'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Home className="h-5 w-5 mr-2" />
              My Properties
            </button>
            <button
              onClick={() => handleTabChange('available')}
              className={`${
                activeTab === 'available'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Building2 className="h-5 w-5 mr-2" />
              Available Properties
            </button>
            <button
              onClick={() => handleTabChange('utilities')}
              className={`${
                activeTab === 'utilities'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Bell className="h-5 w-5 mr-2" />
              Utilities & Reminders
            </button>
            <button
              onClick={() => handleTabChange('documents')}
              className={`${
                activeTab === 'documents'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FileText className="h-5 w-5 mr-2" />
              Documents
            </button>
          </nav>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {renderContent()}

        {showUtilityTracker && (
          <UtilityTracker onClose={() => {
            setShowUtilityTracker(false);
            setActiveTab('rented');
          }} />
        )}

        {showSchedule && selectedProperty && (
          <ScheduleViewer
            onClose={() => {
              setShowSchedule(false);
              setSelectedProperty(null);
            }}
            propertyTitle={selectedProperty.title}
          />
        )}
      </div>
    </div>
  );
};

export default Tenants;