import { User } from '@/interface/User';
import { AuthService } from '@/services/auth_service';
import { clearSession, setToken } from '@/session/session';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (data: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.login(data);

      if ((res as any).status === 'error') {
        setError((res as any).message);
        throw new Error((res as any).message);
      }
      console.log('ini token' + res.data.token);

      setToken(res.data.token, 7);

      return res;
    } catch (err: any) {
      setError(err.message ?? 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: User) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.register(data);
      return res;
    } catch (err: any) {
      setError(err.message ?? 'Register failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    navigate('/', { replace: true });

    clearSession();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
}
