import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import BrokerCard from '../components/BrokerCard';
import BrokerRegistrationForm from '../components/BrokerRegistrationForm';

const Brokers = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const brokers = [
    {
      name: 'John Makonde',
      rating: 4.8,
      location: 'Dar es Salaam',
      phone: '+255 123 456 789',
      specialties: ['Residential', 'Commercial'],
      languages: ['Swahili', 'English'],
      properties: 24,
      experience: '5 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Sarah Mwanza',
      rating: 4.9,
      location: 'Arusha',
      phone: '+255 987 654 321',
      specialties: ['Luxury Properties', 'Land'],
      languages: ['Swahili', 'English', 'French'],
      properties: 31,
      experience: '7 years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Verified Brokers</h1>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setShowRegistrationForm(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Become a Broker
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search brokers by name or location..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-6">
          {brokers.map((broker) => (
            <BrokerCard key={broker.name} {...broker} />
          ))}
        </div>

        {showRegistrationForm && (
          <BrokerRegistrationForm onClose={() => setShowRegistrationForm(false)} />
        )}
      </div>
    </div>
  );
};

export default Brokers;