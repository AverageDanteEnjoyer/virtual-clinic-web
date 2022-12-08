import React from 'react';

type SessionInfoContextType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  userID: number;
  setUserID: (userID: number) => void;
};

export const SessionInfoContext = React.createContext<SessionInfoContextType>({
  isLogged: false,
  setIsLogged: () => {},
  userID: 0,
  setUserID: () => {},
});

export const SessionInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [userID, setUserID] = React.useState<number>(0);
  return (
    <SessionInfoContext.Provider value={{ isLogged, setIsLogged, userID, setUserID }}>
      {children}
    </SessionInfoContext.Provider>
  );
};
