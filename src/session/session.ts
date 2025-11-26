import Cookies from 'js-cookie';

const cookieOptions = {
  path: '/',
  secure: false,
  sameSite: 'Lax' as const,
};

export const setToken = (token: string, expiresDays: number = 7) => {
  Cookies.set('token', token, {
    ...cookieOptions,
    expires: expiresDays,
  });
};

export const getToken = () => Cookies.get('token') || null;

export const removeToken = () => {
  Cookies.remove('token', cookieOptions);
};

export const clearSession = () => {
  const all = Cookies.get();
  Object.keys(all).forEach((name) => {
    Cookies.remove(name, cookieOptions);
  });
};
