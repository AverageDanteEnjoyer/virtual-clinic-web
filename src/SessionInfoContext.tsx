import React from 'react';

type SessionInfoContextType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
};

export const SessionInfoContext = React.createContext<SessionInfoContextType>({
  isLogged: false,
  setIsLogged: () => {},
});

export const SessionInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  return (
    <SessionInfoContext.Provider
      value={{ isLogged: isLogged, setIsLogged: setIsLogged }}
    >
      {children}
    </SessionInfoContext.Provider>
  );
};
