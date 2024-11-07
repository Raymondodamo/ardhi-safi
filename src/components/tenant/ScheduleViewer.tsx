import React from 'react';
import { X, Calendar, Clock, Info, MapPin } from 'lucide-react';

interface ScheduleViewerProps {
  onClose: () => void;
  propertyTitle: string;
}

interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'maintenance' | 'inspection' | 'payment' | 'other';
  location: string;
  description: string;
}

const ScheduleViewer: React.FC<ScheduleViewerProps> = ({ onClose, propertyTitle }) => {
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Monthly Property Inspection',
      date: '2024-04-05',
      time: '10:00 AM',
      type: 'inspection',
      location: propertyTitle,
      description: 'Regular monthly inspection of the property condition and maintenance needs.'
    },
    {
      id: '2',
      title: 'Rent Payment Due',
      date: '2024-04-01',
      time: '11:59 PM',
      type: 'payment',
      location: propertyTitle,
      description: 'Monthly rent payment deadline.'
    },
    {
      id: '3',
      title: 'AC Maintenance',
      date: '2024-04-10',
      time: '2:00 PM',
      type: 'maintenance',
      location: propertyTitle,
      description: 'Scheduled maintenance for air conditioning units.'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'inspection':
        return 'bg-purple-100 text-purple-800';
      case 'payment':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Schedule & Events</h2>
              <p className="text-sm text-gray-600 mt-1">{propertyTitle}</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-3">
            {scheduleEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <p className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <p className="flex items-center text-xs text-gray-500">
                          <Info className="h-3.5 w-3.5 mr-1.5" />
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewer;