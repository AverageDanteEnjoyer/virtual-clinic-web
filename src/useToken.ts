import { useState, useMemo } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return null;

    const userToken = JSON.parse(tokenString);
    return userToken.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string | null) => {
    userToken ? localStorage.setItem('token', JSON.stringify({ token: userToken })) : localStorage.removeItem('token');
    setToken(userToken);
  };

  return useMemo(() => ({ token: token, setToken: saveToken }), [token, saveToken]);
}
