import jwtDecode from 'jwt-decode';

export const getLocalStorageResource = (key: string) => {
  const resourceJSON = localStorage.getItem(key);
  return resourceJSON ? JSON.parse(resourceJSON).value : null;
};

export const setLocalStorageResource = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify({ value }));
};

export const removeLocalStorageResource = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getDataFromToken = (token = getLocalStorageResource('token')) => {
  if (!token) return {};

  const tokenDecoded = jwtDecode<{ exp: number; sub: number }>(token);

  const expDate = new Date(0);
  expDate.setUTCSeconds(tokenDecoded.exp);

  return { tokenExp: expDate, userID: tokenDecoded.sub };
};
