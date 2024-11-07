import React from 'react';
import { Search } from 'lucide-react';

interface TenantSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
}

const TenantSearch: React.FC<TenantSearchProps> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="all">All Tenants</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="ended">Ended</option>
        </select>
      </div>
    </div>
  );
};

export default TenantSearch;