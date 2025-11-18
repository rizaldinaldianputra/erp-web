'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Eye, File, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTableRDT, { TableColumn } from 'react-data-table-component';
import * as XLSX from 'xlsx';

export interface Column<T> {
  key: keyof T;
  header: string;
  format?: (value: any, row?: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  actions?: (row: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  pageSize = 10,
  actions,
}: DataTableProps<T>) {
  const [filterText, setFilterText] = useState('');

  // FILTER DATA
  const filteredData = useMemo(() => {
    if (!filterText) return data;

    const lower = filterText.toLowerCase();

    return data.filter((row) =>
      Object.values(row).some((val) => val && String(val).toLowerCase().includes(lower)),
    );
  }, [data, filterText]);

  // REACT DATA TABLE COLUMNS
  const rdtColumns: TableColumn<T>[] = useMemo(() => {
    const cols: TableColumn<T>[] = columns.map((col) => ({
      name: col.header,
      selector: (row: T) => row[col.key] as any,
      sortable: true,
      wrap: true,
      cell: (row: T) => (col.format ? col.format(row[col.key], row) : row[col.key]),
      minWidth: '140px',
    }));

    if (actions) {
      cols.push({
        name: 'Actions',
        selector: () => '' as any, // FIX TS
        sortable: false,
        wrap: true,
        cell: actions,
        minWidth: '220px',
      });
    }

    return cols;
  }, [columns, actions]);

  // EXPORT EXCEL
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className="flex flex-col gap-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* BUTTON PRIMARY */}
          <Button
            size="sm"
            className="!bg-primary !text-white hover:!bg-primary/80"
            onClick={() => alert('Create User')}
          >
            <File className="w-4 h-4 mr-1" />
            Create User
          </Button>

          {/* BUTTON SECONDARY */}
          <Button
            size="sm"
            variant="default"
            className="bg-blue-700 text-white hover:bg-blue-800"
            onClick={exportExcel}
          >
            <File className="w-4 h-4 mr-1" />
            Export Excel
          </Button>
        </div>

        {/* SEARCH */}
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </div>

      {/* DATATABLE */}
      <DataTableRDT
        columns={rdtColumns}
        data={filteredData}
        pagination
        paginationPerPage={pageSize}
        highlightOnHover
        striped
        responsive
        customStyles={{
          headCells: {
            style: {
              backgroundColor: '#090979',
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
            },
          },
        }}
      />
    </div>
  );
}

// ====================== ACTION BUTTONS ======================

export const productActions = (row: { nama: string; active?: boolean }) => (
  <div className="flex gap-1 flex-wrap">
    <Button
      size="sm"
      className="bg-blue-500 text-white hover:bg-blue-600"
      onClick={() => alert(`View ${row.nama}`)}
    >
      <Eye className="mr-1 w-4 h-4" /> View
    </Button>

    <Button
      size="sm"
      className="bg-purple-500 text-white hover:bg-purple-600"
      onClick={() => alert(`Edit ${row.nama}`)}
    >
      <Edit className="mr-1 w-4 h-4" /> Edit
    </Button>

    <Button
      size="sm"
      className={
        row.active
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-green-500 text-white hover:bg-green-600'
      }
      onClick={() => alert(`${row.nama} set to ${row.active ? 'Nonactive' : 'Active'}`)}
    >
      {row.active ? (
        <>
          <ToggleLeft className="mr-1 w-4 h-4" /> Nonactive
        </>
      ) : (
        <>
          <ToggleRight className="mr-1 w-4 h-4" /> Active
        </>
      )}
    </Button>
  </div>
);
