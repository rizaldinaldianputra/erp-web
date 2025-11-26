import { ApiResponse, PageResponse } from '@/interface/ApiResponse';
import { Department } from '@/interface/Department';
import { apiCore } from './main_service';

export const DepartmentService = {
  async getAll(page: number = 0, size: number = 10) {
    const res = await apiCore.get<ApiResponse<PageResponse<Department>>>('/departments', {
      page,
      size,
    });
    return res.data.data;
  },

  async getById(id: number) {
    const res = await apiCore.get<ApiResponse<Department>>(`/departments/${id}`);
    return res.data.data;
  },

  async create(body: Partial<Department>) {
    const res = await apiCore.post<ApiResponse<Department>>('/departments', body);
    return res.data.data;
  },

  async update(id: number, body: Partial<Department>) {
    const res = await apiCore.put<ApiResponse<Department>>(`/departments/${id}`, body);
    return res.data.data;
  },

  async delete(id: number) {
    const res = await apiCore.delete<ApiResponse<null>>(`/departments/${id}`);
    return res.data.message;
  },
};
