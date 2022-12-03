import React, { useMemo, useState } from 'react';

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const TokenContext = React.createContext<TokenContextType>({ token: null, setToken: () => {} });

export const TokenContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const saveToken = (userToken: string | null) => {
    userToken ? localStorage.setItem('token', JSON.stringify({ token: userToken })) : localStorage.removeItem('token');
    setToken(userToken);
  };
  return (
    <TokenContext.Provider value={useMemo(() => ({ token: token, setToken: saveToken }), [token, saveToken])}>
      {children}
    </TokenContext.Provider>
  );
};
