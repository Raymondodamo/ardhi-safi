import React from 'react';
import { Users, FileText, Bell } from 'lucide-react';

interface Tenant {
  id: number;
  status: string;
}

interface TenantStatsProps {
  tenants: Tenant[];
}

const TenantStats: React.FC<TenantStatsProps> = ({ tenants }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Tenants</p>
            <p className="text-2xl font-semibold text-gray-900">{tenants.length}</p>
          </div>
          <Users className="h-8 w-8 text-emerald-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Leases</p>
            <p className="text-2xl font-semibold text-gray-900">
              {tenants.filter(t => t.status === 'active').length}
            </p>
          </div>
          <FileText className="h-8 w-8 text-emerald-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending Approvals</p>
            <p className="text-2xl font-semibold text-gray-900">
              {tenants.filter(t => t.status === 'pending').length}
            </p>
          </div>
          <Bell className="h-8 w-8 text-emerald-600" />
        </div>
      </div>
    </div>
  );
};

export default TenantStats;