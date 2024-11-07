import React, { useState } from 'react';
import { X, MapPin, Building2, Ruler, AlertTriangle, DollarSign, Info } from 'lucide-react';

interface PropertyCardProps {
  title: string;
  type: string;
  location: string;
  size: number;
  price: string;
  hasLegalCase?: boolean;
  image?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  type,
  location,
  size,
  price,
  hasLegalCase,
  image
}) => {
  const [showLegalCase, setShowLegalCase] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {image && (
        <div className="relative h-48 sm:h-56 md:h-48 lg:h-56 xl:h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="mb-4 flex-1">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-medium">
              {type}
            </span>
            {hasLegalCase && (
              <button
                onClick={() => setShowLegalCase(true)}
                className="inline-flex items-center px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors"
              >
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Legal Case
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 text-sm sm:text-base">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Ruler className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{size} sq.m</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>TSh {price}</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowDetails(true)}
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <Info className="h-4 w-4 mr-2" />
            View Details
          </button>
        </div>
      </div>

      {/* Modals */}
      {(showLegalCase || showDetails) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {showLegalCase ? 'Legal Status' : title}
                </h3>
                <button
                  onClick={() => {
                    setShowLegalCase(false);
                    setShowDetails(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {showLegalCase ? (
                <div className="space-y-4">
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Active Cases: 1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Case Details:</h4>
                    <p className="text-gray-600">
                      Ongoing boundary dispute with neighboring property.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {image && (
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                    />
                  )}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>Type: {type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Location: {location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Ruler className="h-4 w-4 mr-2" />
                      <span>Size: {size} sq.m</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>Price: TSh {price}</span>
                    </div>
                  </div>
                  <button className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors mt-4">
                    Contact Agent
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;