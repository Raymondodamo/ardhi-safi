import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle, 
  Home,
  Map,
  User,
  UserCheck,
  CreditCard,
  Wallet,
  LogIn,
  UserPlus,
  KeyRound
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Properties', icon: Building2, path: '/properties' },
    { name: 'Maps', icon: Map, path: '/maps' },
    { name: 'Brokers', icon: Users, path: '/brokers' },
    { name: 'Landlords', icon: UserCheck, path: '/landlords' },
    { name: 'Tenants', icon: User, path: '/tenants' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Accounts', icon: Wallet, path: '/accounts' },
    { name: 'Documents', icon: FileText, path: '/documents' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help', icon: HelpCircle, path: '/help' }
  ];

  const authPages = [
    { name: 'Login', icon: LogIn, path: '/login' },
    { name: 'Register', icon: UserPlus, path: '/register' },
    { name: 'Forgot Password', icon: KeyRound, path: '/forgot-password' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
        <Building2 className="h-8 w-8 text-emerald-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">Ardhi Safi</span>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`${
                  location.pathname === item.path
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors`}
              >
                <item.icon
                  className={`${
                    location.pathname === item.path ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5 flex-shrink-0`}
                />
                {item.name}
              </button>
            ))}
          </div>

          {/* Authentication Pages Section */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Authentication
            </h3>
            <div className="mt-2 space-y-1">
              {authPages.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`${
                    location.pathname === item.path
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors`}
                >
                  <item.icon
                    className={`${
                      location.pathname === item.path ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5 flex-shrink-0`}
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;