import React, { useState } from 'react';
import { Doctor } from '../types';
import { MapPin, Building2 } from 'lucide-react';
import DoctorModal from './DoctorModal';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    name, 
    photo,
    specialities, 
    experience, 
    fees, 
    clinic,
    doctor_introduction,
    name_initials
  } = doctor;
  
  return (
    <>
      <div 
        data-testid="doctor-card" 
        className="bg-white rounded-lg p-6 transition-all duration-200 hover:shadow-lg border border-gray-100 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex gap-4">
          {/* Doctor Photo */}
          <div className="flex-shrink-0">
            {photo ? (
              <img 
                src={photo} 
                alt={name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 text-xl font-semibold">
                  {name_initials}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {/* Doctor Name and Specialty */}
            <div className="mb-2">
              <h3 
                data-testid="doctor-name" 
                className="text-lg font-semibold text-gray-900"
              >
                {name}
              </h3>
              
              <div 
                data-testid="doctor-specialty" 
                className="text-gray-600"
              >
                {specialities[0]?.name}
              </div>
              
              {doctor_introduction && (
                <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {doctor_introduction}
                </div>
              )}
            </div>
            
            {/* Experience and Fees */}
            <div 
              data-testid="doctor-experience" 
              className="text-sm text-gray-700 mb-2"
            >
              {experience}
            </div>
            
            {/* Clinic Info */}
            {clinic && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <Building2 size={16} />
                <span>{clinic.name}</span>
              </div>
            )}
            
            {/* Location */}
            {clinic?.address && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                <MapPin size={16} />
                <span>{clinic.address.locality}</span>
              </div>
            )}
            
            {/* Fees and Book Button */}
            <div className="flex items-center justify-between mt-4">
              <div 
                data-testid="doctor-fee" 
                className="text-lg font-semibold text-gray-900"
              >
                {fees}
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <DoctorModal 
          doctor={doctor} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default DoctorCard;