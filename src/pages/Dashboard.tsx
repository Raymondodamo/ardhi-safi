import React from 'react';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';
import PropertyCard from '../components/PropertyCard';

const Dashboard = () => {
  const featuredProperties = [
    {
      title: 'Modern Villa in Masaki',
      location: 'Masaki, Dar es Salaam',
      price: '850M',
      size: 450,
      type: 'Residential',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      hasLegalCase: true
    },
    {
      title: 'Commercial Plot in CBD',
      location: 'CBD, Dar es Salaam',
      price: '1.2B',
      size: 1200,
      type: 'Commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Residential Plot in Mbezi',
      location: 'Mbezi Beach, Dar es Salaam',
      price: '350M',
      size: 800,
      type: 'Land',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      hasLegalCase: true
    }
  ];

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
          Find Your Perfect Property in Tanzania
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          Secure and transparent land transactions with verified listings and dispute resolution support.
        </p>
        
        <SearchBar />
        
        <div className="my-8 sm:my-12">
          <Stats />
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Featured Properties</h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.title} {...property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;