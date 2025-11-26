import { PageResponse } from '@/interface/ApiResponse';
import { Department } from '@/interface/Department';
import { DepartmentService } from '@/services/department_service';
import { useCallback, useEffect, useState } from 'react';

export function useDepartment(page = 0, size = 10) {
  const [list, setList] = useState<PageResponse<Department> | null>(null);
  const [detail, setDetail] = useState<Department | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await DepartmentService.getAll(page, size);
      setList(res?.data?.data ?? null);
    } catch (err: any) {
      setError(err.message ?? 'Error fetching departments.');
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  const fetchById = useCallback(async (id: number) => {
    setError(null);
    setLoadingDetail(true);
    try {
      const res = await DepartmentService.getById(id);
      setDetail(res?.data?.data ?? null);
    } catch (err: any) {
      setError(err.message ?? 'Error fetching department detail.');
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  const create = useCallback(
    async (data: Partial<Department>) => {
      setError(null);
      setSaving(true);
      try {
        const res = await DepartmentService.create(data);
        await fetchAll();
        return res?.data?.data;
      } catch (err: any) {
        setError(err.message ?? 'Error creating department.');
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [fetchAll],
  );

  const update = useCallback(
    async (id: number, data: Partial<Department>) => {
      setError(null);
      setSaving(true);
      try {
        const res = await DepartmentService.update(id, data);
        await fetchAll();
        return res?.data?.data;
      } catch (err: any) {
        setError(err.message ?? 'Error updating department.');
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [fetchAll],
  );

  const remove = useCallback(
    async (id: number) => {
      setError(null);
      setDeleting(true);
      try {
        await DepartmentService.delete(id);
        await fetchAll();
      } catch (err: any) {
        setError(err.message ?? 'Error deleting department.');
        throw err;
      } finally {
        setDeleting(false);
      }
    },
    [fetchAll],
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    list,
    detail,
    loading,
    loadingDetail,
    saving,
    deleting,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}
