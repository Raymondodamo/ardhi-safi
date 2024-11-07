import React from 'react';
import { Building2, Users, ShieldCheck } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Building2,
      label: 'Active Listings',
      value: '2,345'
    },
    {
      icon: Users,
      label: 'Verified Brokers',
      value: '150+'
    },
    {
      icon: ShieldCheck,
      label: 'Secure Transactions',
      value: '1,200+'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-50 p-2 sm:p-3 rounded-lg">
              <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;