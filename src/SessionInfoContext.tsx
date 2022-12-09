import React from 'react';

export enum userType {
  GUEST = 'guest',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

type SessionInfoContextType = {
  accountType: userType;
  setAccountType: (accountType: userType) => void;
  userID: number;
  setUserID: (userID: number) => void;
};

export const SessionInfoContext = React.createContext<SessionInfoContextType>({
  accountType: userType.GUEST,
  setAccountType: () => {},
  userID: 0,
  setUserID: () => {},
});

export const SessionInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountType, setAccountType] = React.useState<userType>(userType.GUEST);
  const [userID, setUserID] = React.useState<number>(0);
  return (
    <SessionInfoContext.Provider value={{ accountType, setAccountType, userID, setUserID }}>
      {children}
    </SessionInfoContext.Provider>
  );
};
