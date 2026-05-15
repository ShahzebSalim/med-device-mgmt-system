import { Certification } from './certification';

export interface Device {
  id?: number;
  name: string;
  udi: string;
  productLine?: string;
  version: string;
  status: string;
  createdAt?: string;
  
  // --- NEW TRACEABILITY FIELDS ---
  teamId?: number;
  teamName?: string; 

  certifications?: Certification[];
}