import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import routes from '../routes';
import { getExpDateFromToken, getToken, removeToken } from '../tokenApi';
import { SessionInfoContext } from '../SessionInfoContext';

import ComponentsPage from '../Pages/ComponentsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';

const Application = () => {
  const { setIsLogged, setUserID } = useContext(SessionInfoContext);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const tokenDecoded = jwtDecode<{ sub: number }>(token);
    const expDate = getExpDateFromToken(token);

    if (expDate && expDate < new Date()) {
      removeToken(); //removes token from localStorage when it expires
    } else {
      setUserID(tokenDecoded.sub);
      setIsLogged(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.components} element={<ComponentsPage />} />
        <Route path={routes.logIn} element={<LoginPage />} />
        <Route path={routes.register} element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
