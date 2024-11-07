import React, { useState } from 'react';
import { X, Globe, Check, MapPin } from 'lucide-react';

interface LanguageModalProps {
  onClose: () => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Region {
  code: string;
  name: string;
  nativeName: string;
  timezone: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('sw');
  const [selectedRegion, setSelectedRegion] = useState('TZ');

  const languages: Language[] = [
    { 
      code: 'sw', 
      name: 'Swahili', 
      nativeName: 'Kiswahili',
      flag: '🇹🇿'
    },
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇬🇧'
    }
  ];

  const regions: Region[] = [
    {
      code: 'TZ',
      name: 'Tanzania',
      nativeName: 'Tanzania',
      timezone: 'Saa za Afrika Mashariki (EAT)'
    },
    {
      code: 'KE',
      name: 'Kenya',
      nativeName: 'Kenya',
      timezone: 'Saa za Afrika Mashariki (EAT)'
    },
    {
      code: 'UG',
      name: 'Uganda',
      nativeName: 'Uganda',
      timezone: 'Saa za Afrika Mashariki (EAT)'
    }
  ];

  const translations = {
    title: 'Lugha na Mkoa',
    selectLanguage: 'Chagua Lugha',
    selectRegion: 'Chagua Mkoa',
    save: 'Hifadhi Mabadiliko',
    cancel: 'Ghairi'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle language and region update
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold">{translations.title}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500"
              aria-label="Funga"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {translations.selectLanguage}
              </label>
              <div className="space-y-3">
                {languages.map((language) => (
                  <label
                    key={language.code}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                      selectedLanguage === language.code
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <input
                        type="radio"
                        name="language"
                        value={language.code}
                        checked={selectedLanguage === language.code}
                        onChange={() => setSelectedLanguage(language.code)}
                        className="sr-only"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{language.nativeName}</p>
                        <p className="text-sm text-gray-500">{language.name}</p>
                      </div>
                    </div>
                    {selectedLanguage === language.code && (
                      <Check className="h-5 w-5 text-emerald-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {translations.selectRegion}
              </label>
              <div className="space-y-3">
                {regions.map((region) => (
                  <label
                    key={region.code}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                      selectedRegion === region.code
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <input
                        type="radio"
                        name="region"
                        value={region.code}
                        checked={selectedRegion === region.code}
                        onChange={() => setSelectedRegion(region.code)}
                        className="sr-only"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{region.nativeName}</p>
                        <p className="text-sm text-gray-500">{region.timezone}</p>
                      </div>
                    </div>
                    {selectedRegion === region.code && (
                      <Check className="h-5 w-5 text-emerald-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              {translations.save}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              {translations.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LanguageModal;