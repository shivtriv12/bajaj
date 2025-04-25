import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types';
import { getAutocompleteSuggestions } from '../utils/filterUtils';

interface AutocompleteSearchProps {
  doctors: Doctor[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
  doctors, 
  searchTerm, 
  onSearchChange 
}) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      const matches = getAutocompleteSuggestions(doctors, searchTerm);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    onSearchChange(doctor.name);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={inputRef}
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
        >
          {suggestions.slice(0, 3).map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(doctor)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              {doctor.photo ? (
                <img 
                  src={doctor.photo} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold">
                    {doctor.name_initials}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">{doctor.name}</div>
                <div className="text-sm text-gray-500">
                  {doctor.specialities[0]?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;