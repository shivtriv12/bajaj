export interface SortOption {
  value: string;
  label: string;
  field: 'fees' | 'experience';
  order: 'asc' | 'desc';
}

interface DoctorSpecialty {
  name: string;
}

interface DoctorAddress {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url: string;
}

interface DoctorClinic {
  name: string;
  address: DoctorAddress;
}

export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: DoctorSpecialty[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: DoctorClinic;
  video_consult: boolean;
  in_clinic: boolean;
}

export interface FilterState {
  search: string;
  consultationType: 'video' | 'clinic' | '';
  specialties: string[];
  sortBy: string;
}