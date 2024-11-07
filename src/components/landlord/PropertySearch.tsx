import React from 'react';
import { Search, Filter } from 'lucide-react';

interface PropertySearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>
    </div>
  );
};

export default PropertySearch;