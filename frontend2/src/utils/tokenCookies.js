import { removeCookie, getCookie, setCookie } from 'react-use-cookie';
import {
  COOKIE_EXPIRATION_TIME,
  REFRESH_TOKEN_COOKIE,
  TOKEN_COOKIE
} from './constant';

export function createSessionCookies(params) {
  const { token, refreshToken } = params;

  if (token) {
    setCookie(TOKEN_COOKIE, token, {
      days: COOKIE_EXPIRATION_TIME,
      path: '/',
      SameSite: 'Lax',
      Secure: true,
    });
  }

  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      days: COOKIE_EXPIRATION_TIME,
      path: '/',
      SameSite: 'Lax',
      Secure: true,
    });
  }
}

export function removeSessionCookies() {
  removeCookie(TOKEN_COOKIE);
  removeCookie(REFRESH_TOKEN_COOKIE);
}


export function getToken() {
  const cookies = getCookie(TOKEN_COOKIE);
  return cookies || null;
}

export function getRefreshToken() {
  const cookies = getCookie(REFRESH_TOKEN_COOKIE);
  return cookies || null;
}
