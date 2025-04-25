import React from 'react';
import { FilterState } from '../types';
import { SORT_OPTIONS } from '../utils/filterUtils';

interface FilterPanelProps {
  filters: FilterState;
  specialtiesList: string[];
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  specialtiesList, 
  onFilterChange 
}) => {
  const handleConsultationChange = (value: 'video' | 'clinic') => {
    if (filters.consultationType === value) {
      onFilterChange({ consultationType: '' });
    } else {
      onFilterChange({ consultationType: value });
    }
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
      
    onFilterChange({ specialties: updatedSpecialties });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ sortBy: value });
  };

  const formatSpecialtyId = (specialty: string) => {
    return specialty.replace(/[^a-zA-Z0-9]/g, '-');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="text-lg font-semibold mb-3 text-gray-800"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'video'}
              onChange={() => handleConsultationChange('video')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'clinic'}
              onChange={() => handleConsultationChange('clinic')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="text-lg font-semibold mb-3 text-gray-800"
        >
          Speciality
        </h3>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {[
            "General Physician",
            "Dentist",
            "Dermatologist",
            "Paediatrician",
            "Gynaecologist",
            "ENT",
            "Diabetologist",
            "Cardiologist",
            "Physiotherapist",
            "Endocrinologist",
            "Orthopaedic",
            "Ophthalmologist",
            "Gastroenterologist",
            "Pulmonologist",
            "Psychiatrist",
            "Urologist",
            "Dietitian-Nutritionist",
            "Psychologist",
            "Sexologist",
            "Nephrologist",
            "Neurologist",
            "Oncologist",
            "Ayurveda",
            "Homeopath"
          ].map(specialty => (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${formatSpecialtyId(specialty)}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="text-lg font-semibold mb-3 text-gray-800"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          {SORT_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                data-testid={option.value === 'fees_asc' ? 'sort-fees' : 
                           option.value === 'experience_desc' ? 'sort-experience' : undefined}
                checked={filters.sortBy === option.value}
                onChange={() => handleSortChange(option.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;