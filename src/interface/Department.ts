import { Office } from './Ofiice';

export interface Department {
  id: number;
  code: string;
  name: string;
  office: Office | null; // bisa null jika tidak ada office

  createdBy: string | null;
  createdDate: string; // biasanya LocalDateTime → string di JSON
  updatedBy: string | null;
  updatedDate: string | null;
}
