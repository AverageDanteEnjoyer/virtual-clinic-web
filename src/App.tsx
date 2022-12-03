import React, { useContext, useMemo } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { TokenContext, TokenContextProvider } from './TokenContext';
import jwtDecode from 'jwt-decode';

function App() {
  const { token, setToken } = useContext(TokenContext);
  useMemo(() => {
    if (!token) return;
    let sessionInfo = jwtDecode<{ exp: number }>(token);

    const exp_date = new Date(0);
    exp_date.setUTCSeconds(sessionInfo.exp);
    if (exp_date < new Date()) setToken(null); //removes token from localStorage when it expires
  }, []);
  return (
    <header>
      <TokenContextProvider>
        <Navbar />
      </TokenContextProvider>
    </header>
  );
}

export default App;
