export interface Personnel {
  id?: number;
  name: string;
  role?: string;
  email?: string;

  // nullable association
  teamId?: number | null;
}
