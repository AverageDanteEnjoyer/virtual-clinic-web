import React, { useContext, useMemo } from 'react';
import jwtDecode from 'jwt-decode';

import { SessionInfoContext, SessionInfoContextProvider } from './SessionInfoContext';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const { setIsLogged } = useContext(SessionInfoContext);

  useMemo(() => {
    let token = localStorage.getItem('token');
    if (!token) return;
    let sessionInfo = jwtDecode<{ exp: number }>(token);

    const exp_date = new Date(0);
    exp_date.setUTCSeconds(sessionInfo.exp);

    if (exp_date < new Date()) {
      localStorage.removeItem('token'); //removes token from localStorage when it expires
    } else {
      setIsLogged(true);
    }
  }, []);

  return (
    <header>
      <SessionInfoContextProvider>
        <Navbar />
      </SessionInfoContextProvider>
    </header>
  );
}

export default App;
