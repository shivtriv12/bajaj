import React from 'react';
import { Doctor } from '../types';
import { X, MapPin, Building2, Phone, Video, Globe, Languages } from 'lucide-react';

interface DoctorModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose }) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-modal-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex gap-6">
            {doctor.photo ? (
              <img 
                src={doctor.photo} 
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 text-2xl font-semibold">
                  {doctor.name_initials}
                </span>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                {doctor.name}
              </h2>
              <div className="text-gray-600 mb-2">
                {doctor.specialities.map(s => s.name).join(', ')}
              </div>
              <div className="text-gray-700">{doctor.experience}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Introduction */}
          {doctor.doctor_introduction && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700">{doctor.doctor_introduction}</p>
            </div>
          )}

          {/* Languages */}
          {doctor.languages && doctor.languages.length > 0 && (
            <div className="flex items-start gap-2">
              <Languages className="text-gray-500 mt-1" size={18} />
              <div>
                <div className="font-medium text-gray-900 mb-1">Languages</div>
                <div className="text-gray-700">{doctor.languages.join(', ')}</div>
              </div>
            </div>
          )}

          {/* Consultation Modes */}
          <div className="grid md:grid-cols-2 gap-4">
            {doctor.video_consult && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Video className="text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Video Consultation</div>
                  <div className="text-gray-600">Available</div>
                </div>
              </div>
            )}
            
            {doctor.in_clinic && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Building2 className="text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">In-Clinic Visit</div>
                  <div className="text-gray-600">Available</div>
                </div>
              </div>
            )}
          </div>

          {/* Clinic Details */}
          {doctor.clinic && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Clinic Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-2">
                  <Building2 className="text-gray-500 mt-1" size={18} />
                  <div>
                    <div className="font-medium text-gray-900">{doctor.clinic.name}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="text-gray-500 mt-1" size={18} />
                  <div className="text-gray-700">
                    {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <div>
            <div className="text-sm text-gray-600">Consultation Fee</div>
            <div className="text-2xl font-semibold text-gray-900">{doctor.fees}</div>
          </div>
          
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;