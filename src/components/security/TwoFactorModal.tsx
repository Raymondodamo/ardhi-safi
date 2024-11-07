import React, { useState } from 'react';
import { X, Smartphone, Mail, Shield } from 'lucide-react';

interface TwoFactorModalProps {
  onClose: () => void;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ onClose }) => {
  const [method, setMethod] = useState<'sms' | 'email'>('sms');
  const [step, setStep] = useState<'select' | 'verify'>('select');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'select') {
      setStep('verify');
    } else {
      // Handle 2FA verification logic here
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 'select' ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Choose how you want to receive your verification codes
              </p>

              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="2fa-method"
                    value="sms"
                    checked={method === 'sms'}
                    onChange={() => setMethod('sms')}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="ml-3 flex items-center">
                    <Smartphone className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS</p>
                      <p className="text-sm text-gray-500">Send code to +255 *** *** 789</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="2fa-method"
                    value="email"
                    checked={method === 'email'}
                    onChange={() => setMethod('email')}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="ml-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-500">Send code to j***@example.com</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Enter the verification code sent to your {method === 'sms' ? 'phone' : 'email'}
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none ring-1 ring-transparent focus:ring-2 transition-shadow"
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>

              <p className="text-sm text-gray-500">
                Didn't receive the code?{' '}
                <button type="button" className="text-emerald-600 hover:text-emerald-700">
                  Resend
                </button>
              </p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              {step === 'select' ? 'Continue' : 'Verify'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorModal;