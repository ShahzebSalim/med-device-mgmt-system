import { Certification } from './certification';

export interface Device {
  id: number;
  name: string;
  udi: string;
  version: string;
  status: string;
  createdAt?: string;
  certifications?: Certification[];
}
