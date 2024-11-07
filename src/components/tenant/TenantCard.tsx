import React from 'react';
import { User, Phone, Mail, Home, Calendar, DollarSign, MoreVertical } from 'lucide-react';

interface TenantCardProps {
  name: string;
  email: string;
  phone: string;
  property: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: string;
  image?: string;
}

const TenantCard: React.FC<TenantCardProps> = ({
  name,
  email,
  phone,
  property,
  leaseStart,
  leaseEnd,
  rentAmount,
  status,
  image
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-500">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {phone}
              </p>
              <p className="flex items-center text-gray-600">
                <Home className="h-4 w-4 mr-2" />
                {property}
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Lease: {new Date(leaseStart).toLocaleDateString()} - {new Date(leaseEnd).toLocaleDateString()}
              </p>
              <p className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                Rent: TSh {rentAmount.toLocaleString()} /month
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-sm">
              View Details
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
              Contact
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm">
              View Lease
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;