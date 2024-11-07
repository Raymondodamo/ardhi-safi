import React, { useState } from 'react';
import { X, Upload, CheckCircle, Building2, BarChart2, MessageSquare, Shield } from 'lucide-react';

interface BrokerRegistrationFormProps {
  onClose: () => void;
}

const BrokerRegistrationForm: React.FC<BrokerRegistrationFormProps> = ({ onClose }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const benefits = [
    {
      icon: Shield,
      title: 'Verified Badge',
      description: 'Get a verified badge to build trust with clients'
    },
    {
      icon: Building2,
      title: 'Priority Listings',
      description: 'Your properties appear at the top of search results'
    },
    {
      icon: BarChart2,
      title: 'Analytics Dashboard',
      description: 'Access detailed insights about your listings and client interactions'
    },
    {
      icon: MessageSquare,
      title: 'Direct Inquiries',
      description: 'Receive direct property inquiries from verified buyers'
    }
  ];

  const requirements = [
    {
      title: 'Valid License',
      description: 'Current real estate broker license issued by the Tanzania Real Estate Board'
    },
    {
      title: 'Experience',
      description: 'Minimum 2 years of experience in Tanzania real estate market'
    },
    {
      title: 'Documentation',
      description: 'Business registration, tax clearance, and professional certificates'
    },
    {
      title: 'Professional Training',
      description: 'Completed recognized real estate training program'
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Become a Verified Broker</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-gray-600">
            Join our network of professional real estate brokers and expand your business.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Requirements</h3>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{req.title}</h4>
                      <p className="text-sm text-gray-600">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-4">Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <benefit.icon className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Application Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    type="text"
                    placeholder="Enter your license number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your real estate experience..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-emerald-600">
                          Upload files
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={(e) => setFiles(e.target.files)}
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">or drag and drop</p>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      License, certificates, and other supporting documents
                    </p>
                    {files && (
                      <div className="mt-4 space-y-2">
                        {Array.from(files).map((file, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerRegistrationForm;