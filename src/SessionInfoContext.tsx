import React from 'react';

export enum userType {
  GUEST = 'guest',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

type SessionInfoContextType = {
  accountType: userType;
  setAccountType: (accountType: userType) => void;
};

export const SessionInfoContext = React.createContext<SessionInfoContextType>({
  accountType: userType.GUEST,
  setAccountType: () => {},
});

export const SessionInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountType, setAccountType] = React.useState<userType>(userType.GUEST);
  return <SessionInfoContext.Provider value={{ accountType, setAccountType }}>{children}</SessionInfoContext.Provider>;
};
