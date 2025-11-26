export interface Organization {
  id: number;

  code: string; // auto-generate by backend
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;

  active: boolean;

  createdBy: string | null;
  createdDate: string; // LocalDateTime dikirim sebagai string ISO
  updatedBy: string | null;
  updatedDate: string | null;
}
