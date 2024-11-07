import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search by location, property type, or price range..."
          className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
        />
        <button className="w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base whitespace-nowrap">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;