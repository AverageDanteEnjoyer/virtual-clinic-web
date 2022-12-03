import React, { useMemo } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';

function App() {
  const { token, setToken } = useToken();
  useMemo(() => {
    if (!token) return;
    let sessionInfo = jwtDecode<{ exp: number }>(token);

    const expDate = new Date(0);
    expDate.setUTCSeconds(sessionInfo.exp);
    if (expDate < new Date()) setToken(null); //removes token from localStorage when it expires
  }, []);
  return (
    <header>
      <Navbar />
    </header>
  );
}

export default App;
