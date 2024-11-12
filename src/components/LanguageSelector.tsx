import { useState } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'sw', label: 'SW' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
      >
        <GlobeAltIcon className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">
          {languages.find(l => l.code === language)?.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 rounded-lg bg-gray-900 border border-gray-800 shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}