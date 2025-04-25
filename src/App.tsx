import React, { useState, useEffect } from 'react';
import { Doctor, FilterState } from './types';
import { fetchDoctors } from './api/doctorsApi';
import { 
  filterDoctors, 
  sortDoctors,
  getFilterStateFromUrl,
  updateUrlWithFilters,
  getSpecialtiesList
} from './utils/filterUtils';
import AutocompleteSearch from './components/AutocompleteSearch';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialtiesList, setSpecialtiesList] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(getFilterStateFromUrl());
  const [loading, setLoading] = useState(true);

  // Fetch doctors data
  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        // Handle both array and single object responses, or null/undefined
        const doctorsArray = Array.isArray(data) ? data : (data ? [data] : []);
        setDoctors(doctorsArray);
        setSpecialtiesList(getSpecialtiesList(doctorsArray));
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
        setSpecialtiesList([]);
      } finally {
        setLoading(false);
      }
    };
    
    getDoctors();
  }, []);

  // Apply filters when doctors data or filters change
  useEffect(() => {
    if (doctors.length > 0) {
      let result = filterDoctors(doctors, filters);
      
      if (filters.sortBy) {
        result = sortDoctors(result, filters.sortBy);
      }
      
      setFilteredDoctors(result);
      updateUrlWithFilters(filters);
    }
  }, [doctors, filters]);

  // Listen for browser navigation events to update filters
  useEffect(() => {
    const handlePopState = () => {
      setFilters(getFilterStateFromUrl());
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-blue-700 mb-4 md:mb-0">Doctor Finder</h1>
            <AutocompleteSearch 
              doctors={doctors} 
              searchTerm={filters.search} 
              onSearchChange={(value) => handleFilterChange({ search: value })} 
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Filter Panel */}
          <aside className="md:col-span-3">
            <FilterPanel 
              filters={filters} 
              specialtiesList={specialtiesList}
              onFilterChange={handleFilterChange} 
            />
          </aside>

          {/* Doctor List */}
          <div className="md:col-span-9">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {!loading && `${filteredDoctors.length} doctors found`}
              </h2>
            </div>
            <DoctorList doctors={filteredDoctors} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;