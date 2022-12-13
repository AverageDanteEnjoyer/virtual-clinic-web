import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { clearLocalStorage, getDataFromToken, getLocalStorageResource } from '../localStorageAPI';
import { SessionInfoContext } from '../SessionInfoContext';
import { ProtectedRoutes } from '../privateRoute';

import ComponentsPage from '../Pages/ComponentsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import AuthVerify from '../AuthVerify';
import ProfileEditPage from '../Pages/ProfileEditPage';

const Application = () => {
  const { accountType, setAccountType } = useContext(SessionInfoContext);

  useEffect(() => {
    const { tokenExp } = getDataFromToken();
    if (!tokenExp) return;

    if (tokenExp < new Date()) {
      clearLocalStorage();
    } else {
      setAccountType(getLocalStorageResource('accountType'));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.components} element={<ComponentsPage />} />
        <Route path={routes.logIn} element={<LoginPage />} />
        <Route path={routes.register} element={<RegistrationPage />} />
        <Route
          path={routes.editProfile}
          element={
            <ProtectedRoutes accountType={accountType} redirectPage={<LoginPage />}>
              <ProfileEditPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
};

export default Application;
