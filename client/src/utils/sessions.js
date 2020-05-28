import * as Cookies from 'js-cookie';

const SESSION_COOKIE_KEY = '__session';

export const setSessionCookie = (session) => {
  Cookies.remove(SESSION_COOKIE_KEY);
  Cookies.set(SESSION_COOKIE_KEY, session, { expires: 14 });
};

export const getSessionCookie = () => {
  const cookie = Cookies.get(SESSION_COOKIE_KEY);

  if (!cookie) {
    return null;
  }

  return cookie;
};

export const clearSession = () => {
  Cookies.remove(SESSION_COOKIE_KEY);
  window.location.href = '/';
};
