import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Map, Users, FileText, Settings, HelpCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Building2, label: 'Properties', path: '/properties' },
    { icon: Map, label: 'Map', path: '/map' },
    { icon: Users, label: 'Brokers', path: '/brokers' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Building2 className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">Ardhi Safi</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;