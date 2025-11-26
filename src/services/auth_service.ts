import { ApiResponse } from '@/interface/ApiResponse';
import { User } from '@/interface/User';
import { apiCore } from './main_service';

interface LoginResponse {
  token: string;
}

export const AuthService = {
  async login(body: { username: string; password: string }) {
    try {
      const res = await apiCore.post('/auth/login', body);

      return res.data;
    } catch (err: any) {
      throw err.response?.data || err;
    }
  },

  // REGISTER (sesuai backend, optional)
  async register(body: User) {
    try {
      const res = await apiCore.post<ApiResponse<any>>('/auth/register', body);
      return res.data.data;
    } catch (err: any) {
      throw err.response?.data || err;
    }
  },
};
