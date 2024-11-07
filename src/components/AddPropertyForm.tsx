import React, { useState } from 'react';
import LocationSelector from './LocationSelector';

interface Location {
  region: string;
  district: string;
  ward: string;
  street: string;
}

const AddPropertyForm: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    region: '',
    district: '',
    ward: '',
    street: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with location:', location);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Property Location</h3>
          <LocationSelector 
            value={location}
            onChange={setLocation}
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;