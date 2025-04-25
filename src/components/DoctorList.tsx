import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">No doctors found matching your criteria.</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;