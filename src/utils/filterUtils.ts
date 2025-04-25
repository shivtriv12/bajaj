import { Doctor, FilterState, SortOption } from '../types';

export const SORT_OPTIONS: SortOption[] = [
  { value: 'fees_asc', label: 'Fees: Low to High', field: 'fees', order: 'asc' },
  { value: 'fees_desc', label: 'Fees: High to Low', field: 'fees', order: 'desc' },
  { value: 'experience_desc', label: 'Experience: Most to Least', field: 'experience', order: 'desc' },
  { value: 'experience_asc', label: 'Experience: Least to Most', field: 'experience', order: 'asc' },
];

export const filterDoctors = (doctors: Doctor[], filters: FilterState): Doctor[] => {
  return doctors.filter(doctor => {
    // Filter by search term
    if (filters.search && !doctor.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filter by consultation type
    if (filters.consultationType === 'video' && !doctor.video_consult) {
      return false;
    }
    if (filters.consultationType === 'clinic' && !doctor.in_clinic) {
      return false;
    }

    // Filter by specialties
    if (filters.specialties.length > 0) {
      const hasSpecialty = doctor.specialities.some(specialty => 
        filters.specialties.includes(specialty.name)
      );
      if (!hasSpecialty) {
        return false;
      }
    }

    return true;
  });
};

export const sortDoctors = (doctors: Doctor[], sortBy: string): Doctor[] => {
  const sortOption = SORT_OPTIONS.find(option => option.value === sortBy);
  if (!sortOption) return doctors;

  return [...doctors].sort((a, b) => {
    let comparison = 0;

    if (sortOption.field === 'fees') {
      const aFee = parseInt(a.fees.replace(/[^\d]/g, ''));
      const bFee = parseInt(b.fees.replace(/[^\d]/g, ''));
      comparison = aFee - bFee;
    } else if (sortOption.field === 'experience') {
      const aExp = parseInt(a.experience);
      const bExp = parseInt(b.experience);
      comparison = aExp - bExp;
    }

    return sortOption.order === 'asc' ? comparison : -comparison;
  });
};

export const getFilterStateFromUrl = (): FilterState => {
  const params = new URLSearchParams(window.location.search);
  
  return {
    search: params.get('search') || '',
    consultationType: (params.get('consultation') as 'video' | 'clinic' | '') || '',
    specialties: params.getAll('specialty'),
    sortBy: params.get('sort') || '',
  };
};

export const updateUrlWithFilters = (filters: FilterState) => {
  const params = new URLSearchParams();
  
  if (filters.search) {
    params.set('search', filters.search);
  }
  
  if (filters.consultationType) {
    params.set('consultation', filters.consultationType);
  }
  
  filters.specialties.forEach(specialty => {
    params.append('specialty', specialty);
  });
  
  if (filters.sortBy) {
    params.set('sort', filters.sortBy);
  }
  
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
  window.history.pushState({}, '', newUrl);
};

export const getSpecialtiesList = (doctors: Doctor[] | undefined | null): string[] => {
  if (!Array.isArray(doctors)) return [];
  
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialities.forEach(specialty => {
      specialtiesSet.add(specialty.name);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};

export const getAutocompleteSuggestions = (doctors: Doctor[], searchTerm: string): Doctor[] => {
  if (!searchTerm.trim()) return [];
  
  return doctors
    .filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 3); // Return top 3 matches
};