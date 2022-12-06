export const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token).token : null;
};

export const setToken = (token: string | null) => {
  localStorage.setItem('token', JSON.stringify({ token }));
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
