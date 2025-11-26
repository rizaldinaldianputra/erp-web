'use client';

import AppBar from '@/components/layout/AppBar';
import { Button } from '@/components/ui/button';
import { Column, DataTable } from '@/components/ui/data-table';
import { Edit, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DepartmentPage() {
  const [data, setData] = useState([]);

  const fetchDepartments = async () => {
    const res = await fetch('/api/departments');
    const json = await res.json();
    setData(json.data || []);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const columns: Column<any>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nama Department' },
    { key: 'code', header: 'Kode' },
    { key: 'description', header: 'Deskripsi' },
  ];

  const actions = (row: any) => (
    <div className="flex gap-1 whitespace-nowrap">
      <Button
        size="sm"
        variant="default"
        className="bg-blue-700 text-white hover:bg-blue-800"
        onClick={() => alert(`View ${row.name}`)}
      >
        <Eye className="mr-1 w-4 h-4" /> View
      </Button>
      <Button
        size="sm"
        variant="default"
        className="bg-gray-700 text-white hover:bg-gray-800"
        onClick={() => alert(`Edit ${row.name}`)}
      >
        <Edit className="mr-1 w-4 h-4" /> Edit
      </Button>
    </div>
  );

  return (
    <div className="flex-col">
      <AppBar name="Department" />
      <DataTable columns={columns} data={data} pageSize={10} actions={actions} />
    </div>
  );
}
