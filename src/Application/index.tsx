import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { removeToken, getDataFromToken } from '../tokenApi';
import { SessionInfoContext } from '../SessionInfoContext';

import ComponentsPage from '../Pages/ComponentsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import AuthVerify from '../AuthVerify';

const Application = () => {
  const { setIsLogged, setUserID } = useContext(SessionInfoContext);

  useEffect(() => {
    const { tokenExp, userID } = getDataFromToken();
    if (!tokenExp) return;

    if (tokenExp < new Date()) {
      removeToken(); //removes token from localStorage when it expires
    } else {
      userID && setUserID(userID);
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
      <AuthVerify />
    </BrowserRouter>
  );
};

export default Application;
