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
