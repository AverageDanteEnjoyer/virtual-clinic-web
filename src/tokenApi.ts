import jwtDecode from 'jwt-decode';

export const getToken = () => {
  const tokenJSON = localStorage.getItem('token');
  return tokenJSON ? JSON.parse(tokenJSON).token : null;
};

export const setToken = (token: string | null) => {
  localStorage.setItem('token', JSON.stringify({ token }));
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getDataFromToken = (token = getToken()) => {
  if (!token) return {};

  const tokenDecoded = jwtDecode<{ exp: number; sub: number }>(token);

  const expDate = new Date(0);
  expDate.setUTCSeconds(tokenDecoded.exp);

  return { tokenExp: expDate, userID: tokenDecoded.sub };
};
