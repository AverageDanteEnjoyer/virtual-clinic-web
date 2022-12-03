import React, { useMemo, useState } from 'react';

type SessionInfoContextType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
};

export const SessionInfoContext = React.createContext<SessionInfoContextType>({
  isLogged: false,
  setIsLogged: () => {},
});

export const SessionInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <SessionInfoContext.Provider
      value={useMemo(() => ({ isLogged: isLogged, setIsLogged: setIsLogged }), [isLogged, setIsLogged])}
    >
      {children}
    </SessionInfoContext.Provider>
  );
};
