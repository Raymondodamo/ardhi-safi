import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Bell, Users, Building2 } from 'lucide-react';
import PropertyListingForm from '../components/landlord/PropertyListingForm';
import LeaseAgreementForm from '../components/landlord/LeaseAgreementForm';
import UtilityTracker from '../components/landlord/UtilityTracker';
import PropertyCard from '../components/PropertyCard';
import TenantCard from '../components/tenant/TenantCard';
import AddTenantForm from '../components/tenant/AddTenantForm';
import TenantStats from '../components/tenant/TenantStats';
import PropertySearch from '../components/landlord/PropertySearch';
import TenantSearch from '../components/tenant/TenantSearch';

const Landlords = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'tenants'>('properties');
  const [showListingForm, setShowListingForm] = useState(false);
  const [showLeaseForm, setShowLeaseForm] = useState(false);
  const [showUtilityTracker, setShowUtilityTracker] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [propertySearchQuery, setPropertySearchQuery] = useState('');
  const [tenantSearchQuery, setTenantSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const properties = [
    {
      id: 1,
      title: 'Modern Apartment in Masaki',
      type: 'Residential',
      status: 'For Rent',
      location: 'Masaki, Dar es Salaam',
      size: 120,
      price: '1.2M',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      utilities: {
        water: { due: '2024-04-01', status: 'pending' },
        electricity: { due: '2024-04-05', status: 'paid' },
        garbage: { due: '2024-04-01', status: 'overdue' }
      }
    }
  ];

  const tenants = [
    {
      id: 1,
      name: 'John Makonde',
      email: 'john.makonde@example.com',
      phone: '+255 123 456 789',
      property: 'Modern Apartment in Masaki',
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      rentAmount: 1200000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Sarah Mwanza',
      email: 'sarah.mwanza@example.com',
      phone: '+255 987 654 321',
      property: 'Commercial Space in CBD',
      leaseStart: '2024-02-01',
      leaseEnd: '2025-01-31',
      rentAmount: 2500000,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(tenantSearchQuery.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(tenantSearchQuery.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(tenantSearchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(propertySearchQuery.toLowerCase())
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('properties')}
              className={`${
                activeTab === 'properties'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Building2 className="h-5 w-5 mr-2" />
              Properties
            </button>
            <button
              onClick={() => setActiveTab('tenants')}
              className={`${
                activeTab === 'tenants'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Users className="h-5 w-5 mr-2" />
              Tenants
            </button>
          </nav>
        </div>

        {activeTab === 'properties' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Property Management</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUtilityTracker(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  Utility Reminders
                </button>
                <button
                  onClick={() => setShowLeaseForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  Generate Lease
                </button>
                <button
                  onClick={() => setShowListingForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  List Property
                </button>
              </div>
            </div>

            <PropertySearch 
              searchQuery={propertySearchQuery}
              onSearchChange={setPropertySearchQuery}
            />

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard {...property} />
                  {property.utilities && (
                    <div className="absolute top-2 right-2 space-y-1">
                      {Object.entries(property.utilities).map(([utility, { status }]) => (
                        <span
                          key={utility}
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {utility} {status}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Tenant Management</h1>
              <button
                onClick={() => setShowAddTenant(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Tenant
              </button>
            </div>

            <TenantSearch
              searchQuery={tenantSearchQuery}
              onSearchChange={setTenantSearchQuery}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />

            <TenantStats tenants={tenants} />

            {/* Tenants Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredTenants.map((tenant) => (
                <TenantCard key={tenant.id} {...tenant} />
              ))}
            </div>
          </>
        )}

        {/* Forms and Modals */}
        {showListingForm && (
          <PropertyListingForm onClose={() => setShowListingForm(false)} />
        )}
        {showLeaseForm && (
          <LeaseAgreementForm onClose={() => setShowLeaseForm(false)} />
        )}
        {showUtilityTracker && (
          <UtilityTracker onClose={() => setShowUtilityTracker(false)} />
        )}
        {showAddTenant && (
          <AddTenantForm onClose={() => setShowAddTenant(false)} />
        )}
      </div>
    </div>
  );
};

export default Landlords;