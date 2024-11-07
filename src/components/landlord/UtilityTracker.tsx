import React, { useState } from 'react';
import { X, Bell, Check, AlertTriangle, DollarSign, Home, Shield, Trash2 } from 'lucide-react';

interface UtilityTrackerProps {
  onClose: () => void;
}

interface Payment {
  id: string;
  name: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  type: 'utility' | 'rent' | 'fee';
  property?: string;
}

const UtilityTracker: React.FC<UtilityTrackerProps> = ({ onClose }) => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      name: 'Monthly Rent',
      dueDate: '2024-04-01',
      amount: 1200000,
      status: 'pending',
      type: 'rent',
      property: 'Modern Apartment in Masaki'
    },
    {
      id: '2',
      name: 'Security Deposit',
      dueDate: '2024-04-01',
      amount: 1200000,
      status: 'pending',
      type: 'fee',
      property: 'Modern Apartment in Masaki'
    },
    {
      id: '3',
      name: 'Water',
      dueDate: '2024-04-01',
      amount: 50000,
      status: 'pending',
      type: 'utility'
    },
    {
      id: '4',
      name: 'Electricity',
      dueDate: '2024-04-05',
      amount: 75000,
      status: 'paid',
      type: 'utility'
    },
    {
      id: '5',
      name: 'Garbage',
      dueDate: '2024-04-01',
      amount: 25000,
      status: 'overdue',
      type: 'utility'
    },
    {
      id: '6',
      name: 'Security',
      dueDate: '2024-04-01',
      amount: 100000,
      status: 'pending',
      type: 'utility'
    },
    {
      id: '7',
      name: 'Maintenance Fee',
      dueDate: '2024-04-15',
      amount: 150000,
      status: 'pending',
      type: 'fee'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'utility' | 'rent' | 'fee'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rent':
        return <Home className="h-6 w-6 text-emerald-600" />;
      case 'utility':
        return <Bell className="h-6 w-6 text-blue-600" />;
      case 'fee':
        return <DollarSign className="h-6 w-6 text-purple-600" />;
      default:
        return <Bell className="h-6 w-6 text-gray-400" />;
    }
  };

  const markAsPaid = (paymentId: string) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: 'paid' as const } : payment
      )
    );
  };

  const deletePayment = (paymentId: string) => {
    setPayments(payments.filter((payment) => payment.id !== paymentId));
  };

  const filteredPayments = payments.filter(
    payment => filter === 'all' || payment.type === filter
  );

  const getTotalAmount = (status: Payment['status']) => {
    return payments
      .filter(payment => payment.status === status)
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Payment Reminders</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-semibold text-yellow-600">
                    TSh {getTotalAmount('pending').toLocaleString()}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Paid This Month</p>
                  <p className="text-2xl font-semibold text-green-600">
                    TSh {getTotalAmount('paid').toLocaleString()}
                  </p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-semibold text-red-600">
                    TSh {getTotalAmount('overdue').toLocaleString()}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('rent')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'rent'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Rent
              </button>
              <button
                onClick={() => setFilter('utility')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'utility'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Utilities
              </button>
              <button
                onClick={() => setFilter('fee')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'fee'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Fees
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getTypeIcon(payment.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{payment.name}</h3>
                    {payment.property && (
                      <p className="text-sm text-gray-500">{payment.property}</p>
                    )}
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                      <span>Amount: TSh {payment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status === 'overdue' && <AlertTriangle className="h-4 w-4 mr-1" />}
                    {payment.status === 'paid' && <Check className="h-4 w-4 mr-1" />}
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                  {payment.status !== 'paid' && (
                    <button
                      onClick={() => markAsPaid(payment.id)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm"
                    >
                      Mark as Paid
                    </button>
                  )}
                  <button
                    onClick={() => deletePayment(payment.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtilityTracker;