import React, { useState } from 'react';
import { User, Lock, Bell, Globe, Shield, Key, Smartphone, History } from 'lucide-react';
import ChangePasswordModal from '../components/security/ChangePasswordModal';
import TwoFactorModal from '../components/security/TwoFactorModal';
import LoginHistoryModal from '../components/security/LoginHistoryModal';
import NotificationsModal from '../components/settings/NotificationsModal';
import LanguageModal from '../components/settings/LanguageModal';
import PrivacyModal from '../components/settings/PrivacyModal';

const Settings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showLoginHistoryModal, setShowLoginHistoryModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const sections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Update your personal information and profile picture',
      action: () => {}
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Manage your password and security preferences',
      subsections: [
        {
          icon: Key,
          title: 'Change Password',
          description: 'Update your password regularly to keep your account secure',
          action: () => setShowPasswordModal(true)
        },
        {
          icon: Smartphone,
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
          action: () => setShowTwoFactorModal(true)
        },
        {
          icon: History,
          title: 'Login History',
          description: 'View your recent login activities',
          action: () => setShowLoginHistoryModal(true)
        }
      ]
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure how you receive alerts and updates',
      action: () => setShowNotificationsModal(true)
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set your preferred language and regional settings',
      action: () => setShowLanguageModal(true)
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Control your data and privacy settings',
      action: () => setShowPrivacyModal(true)
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
        
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {sections.map((section) => (
            <div key={section.title} className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <section.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                  
                  {section.subsections ? (
                    <div className="mt-4 space-y-4">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.title} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <subsection.icon className="h-5 w-5 text-emerald-600" />
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900">{subsection.title}</h3>
                              <p className="text-sm text-gray-500">{subsection.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={subsection.action}
                            className="ml-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm"
                          >
                            {subsection.title.split(' ')[0]}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <button
                        onClick={section.action}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showPasswordModal && (
          <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
        )}
        {showTwoFactorModal && (
          <TwoFactorModal onClose={() => setShowTwoFactorModal(false)} />
        )}
        {showLoginHistoryModal && (
          <LoginHistoryModal onClose={() => setShowLoginHistoryModal(false)} />
        )}
        {showNotificationsModal && (
          <NotificationsModal onClose={() => setShowNotificationsModal(false)} />
        )}
        {showLanguageModal && (
          <LanguageModal onClose={() => setShowLanguageModal(false)} />
        )}
        {showPrivacyModal && (
          <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Settings;