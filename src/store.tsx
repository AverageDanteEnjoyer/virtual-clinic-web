import React, { useReducer } from 'react';

import { clearLocalStorage, setLocalStorageResources } from './localStorageAPI';

export enum userType {
  GUEST = 'guest',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}
type payloadType = {
  accountType: userType;
  localStorage?: {
    token: string | null;
    first_name: string;
    last_name: string;
    email: string;
  };
};
type SessionAction = {
  type: 'login' | 'logout';
  payload?: payloadType;
};
type SessionState = {
  accountType: userType;
};
type StoreType = {
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
};
const initialState = {
  accountType: userType.GUEST,
};

export const Store = React.createContext<StoreType>({
  state: initialState,
  dispatch: () => {},
});

const SessionReducer = (state: SessionState, action: SessionAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'login':
      if (payload?.localStorage) {
        const { accountType, localStorage } = payload;
        setLocalStorageResources({ ...localStorage, accountType: accountType });
      }
      return { ...state, accountType: payload?.accountType || userType.PATIENT };
    case 'logout':
      clearLocalStorage();
      return { ...state, accountType: userType.GUEST };
    default:
      return state;
  }
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(SessionReducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
