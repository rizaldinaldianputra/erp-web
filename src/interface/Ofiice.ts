import { Organization } from './Organization';

export interface Office {
  id: number;
  name: string;
  address: string;
  code: string; // auto generate jika kosong
  phone: string | null;
  email: string | null;
  website: string | null;

  organization: Organization | null;

  createdBy: string | null;
  createdDate: string; // LocalDateTime → string di JSON
  updatedBy: string | null;
  updatedDate: string | null;
}
