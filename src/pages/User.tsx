'use client';

import AppBar from '@/components/layout/AppBar';
import { Column, DataTable } from '@/components/ui/data-table';
import { Edit, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';

type Product = {
  kode: string;
  nama: string;
  harga: number;
  stok: number;
  active?: boolean;
};

const data: Product[] = [
  { kode: 'PRD01', nama: 'Laptop Pro', harga: 15000000, stok: 10, active: true },
  { kode: 'PRD02', nama: 'Mouse Gaming', harga: 250000, stok: 0, active: false },
  { kode: 'PRD03', nama: 'Keyboard', harga: 500000, stok: 5, active: true },
  { kode: 'PRD04', nama: 'Monitor 24"', harga: 2000000, stok: 8, active: true },
  { kode: 'PRD05', nama: 'Headset', harga: 350000, stok: 15, active: true },
  { kode: 'PRD06', nama: 'Webcam HD', harga: 600000, stok: 12, active: false },
  { kode: 'PRD07', nama: 'Printer Laser', harga: 2500000, stok: 4, active: true },
  { kode: 'PRD08', nama: 'Scanner', harga: 1800000, stok: 3, active: false },
  { kode: 'PRD09', nama: 'USB Hub', harga: 150000, stok: 20, active: true },
  { kode: 'PRD10', nama: 'External HDD 1TB', harga: 850000, stok: 6, active: true },
  { kode: 'PRD11', nama: 'External SSD 512GB', harga: 1200000, stok: 7, active: false },
  { kode: 'PRD12', nama: 'Graphics Card RTX 3060', harga: 7500000, stok: 2, active: true },
  { kode: 'PRD13', nama: 'Motherboard ATX', harga: 2500000, stok: 5, active: true },
  { kode: 'PRD14', nama: 'RAM 16GB', harga: 1200000, stok: 10, active: false },
  { kode: 'PRD15', nama: 'Power Supply 650W', harga: 900000, stok: 8, active: true },
  { kode: 'PRD16', nama: 'CPU Intel i7', harga: 5500000, stok: 3, active: true },
  { kode: 'PRD17', nama: 'CPU AMD Ryzen 5', harga: 4500000, stok: 4, active: false },
  { kode: 'PRD18', nama: 'Laptop Gaming', harga: 20000000, stok: 2, active: true },
  { kode: 'PRD19', nama: 'Mousepad XXL', harga: 120000, stok: 25, active: true },
  { kode: 'PRD20', nama: 'Chair Gaming', harga: 1800000, stok: 6, active: false },
  { kode: 'PRD21', nama: 'Desk RGB', harga: 1500000, stok: 3, active: true },
  { kode: 'PRD22', nama: 'Router WiFi 6', harga: 900000, stok: 5, active: true },
  { kode: 'PRD23', nama: 'Switch Network', harga: 750000, stok: 7, active: false },
  { kode: 'PRD24', nama: 'Laptop Office', harga: 10000000, stok: 6, active: true },
  { kode: 'PRD25', nama: 'Tablet 10"', harga: 3500000, stok: 4, active: true },
  { kode: 'PRD26', nama: 'Smartphone', harga: 5000000, stok: 10, active: false },
  { kode: 'PRD27', nama: 'Smartwatch', harga: 1200000, stok: 12, active: true },
  { kode: 'PRD28', nama: 'Speaker Bluetooth', harga: 450000, stok: 15, active: true },
  { kode: 'PRD29', nama: 'Microphone Condenser', harga: 800000, stok: 8, active: false },
  { kode: 'PRD30', nama: 'Laptop Ultrabook', harga: 18000000, stok: 3, active: true },
];

export default function UserPage() {
  const columns: Column<Product>[] = [
    { key: 'kode', header: 'Kode' },
    { key: 'nama', header: 'Nama Produk' },
    { key: 'harga', header: 'Harga', format: (val: number) => <span>Rp {val}</span> },
    { key: 'stok', header: 'Stok', format: (val: number) => <span>{val}</span> },
  ];

  const actions = (row: Product) => (
    <div className="flex gap-1 whitespace-nowrap">
      <Button
        size="sm"
        variant="default"
        className="bg-blue-700 text-white hover:bg-blue-800"
        onClick={() => alert(`View ${row.nama}`)}
      >
        <Eye className="mr-1 w-4 h-4" /> View
      </Button>

      {/* Edit - Secondary */}
      <Button
        size="sm"
        variant="default"
        className="bg-gray-700 text-white hover:bg-gray-800"
        onClick={() => alert(`Edit ${row.nama}`)}
      >
        <Edit className="mr-1 w-4 h-4" /> Edit
      </Button>
    </div>
  );

  return (
    <div className="flex-col">
      <AppBar name="User"></AppBar>
      <DataTable columns={columns} data={data} pageSize={10} actions={actions} />;
    </div>
  );
}
