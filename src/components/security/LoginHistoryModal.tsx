import React from 'react';
import { X, Monitor, Smartphone, MapPin, Calendar } from 'lucide-react';

interface LoginHistoryModalProps {
  onClose: () => void;
}

interface LoginSession {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile';
  location: string;
  date: string;
  status: 'success' | 'failed';
  ipAddress: string;
}

const LoginHistoryModal: React.FC<LoginHistoryModalProps> = ({ onClose }) => {
  const loginHistory: LoginSession[] = [
    {
      id: '1',
      device: 'Chrome on Windows',
      deviceType: 'desktop',
      location: 'Dar es Salaam, Tanzania',
      date: '2024-03-25 14:30',
      status: 'success',
      ipAddress: '196.xxx.xxx.xxx'
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      deviceType: 'mobile',
      location: 'Arusha, Tanzania',
      date: '2024-03-24 09:15',
      status: 'success',
      ipAddress: '197.xxx.xxx.xxx'
    },
    {
      id: '3',
      device: 'Unknown Device',
      deviceType: 'mobile',
      location: 'Nairobi, Kenya',
      date: '2024-03-23 18:45',
      status: 'failed',
      ipAddress: '198.xxx.xxx.xxx'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Login History</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {loginHistory.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {session.deviceType === 'desktop' ? (
                    <Monitor className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Smartphone className="h-6 w-6 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{session.device}</p>
                    <div className="mt-1 space-y-1">
                      <p className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {session.location}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(session.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      session.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {session.status === 'success' ? 'Successful' : 'Failed'}
                  </span>
                  <p className="mt-1 text-sm text-gray-500">{session.ipAddress}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginHistoryModal;