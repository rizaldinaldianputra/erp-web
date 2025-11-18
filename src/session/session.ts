import Cookies from 'js-cookie';

const cookieOptions = {
  path: '/',
  domain: window.location.hostname,
  secure: window.location.protocol === 'https:',
  sameSite: 'None' as 'None' | 'Lax' | 'Strict',
};

export const setToken = (token: string, expiresDays: number = 7) => {
  Cookies.set('token', token, { ...cookieOptions, expires: expiresDays });
};

export const getToken = (): string | null => Cookies.get('token') || null;
export const removeToken = () => Cookies.remove('token', cookieOptions);

export const setUserId = (userId: number, expiresDays: number = 7) => {
  Cookies.set('userId', userId.toString(), { ...cookieOptions, expires: expiresDays });
};

export const getUserId = (): number | null => {
  const id = Cookies.get('userId');
  return id ? parseInt(id, 10) : null;
};

export const removeUserId = () => Cookies.remove('userId', cookieOptions);

export const clearSession = () => {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName, cookieOptions);
  });
};
