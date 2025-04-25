export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultationType: "Video Consult" | "In Clinic" | "Both";
  location: string;
  qualifications: string[];
  clinic: string;
  photo: string;
}

export type ConsultationType = "Video Consult" | "In Clinic" | "All";
export type SortType = "fees" | "experience" | null;

export interface FilterState {
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortType;
  searchQuery: string;
}
