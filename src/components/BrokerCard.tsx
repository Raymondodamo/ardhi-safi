import React from 'react';
import { Star, Phone, Building2, Clock, Globe, User } from 'lucide-react';

interface BrokerCardProps {
  name: string;
  rating: number;
  location: string;
  phone: string;
  specialties: string[];
  languages: string[];
  propertyCount: number;
  experience: string;
  image?: string;
}

const BrokerCard: React.FC<BrokerCardProps> = ({
  name,
  rating,
  location,
  phone,
  specialties,
  languages,
  propertyCount,
  experience,
  image
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
              <User className="w-12 h-12 text-emerald-600" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="ml-1 text-gray-600">{rating}</span>
              </div>
            </div>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Globe className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{propertyCount} Properties</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{experience} Experience</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerCard;