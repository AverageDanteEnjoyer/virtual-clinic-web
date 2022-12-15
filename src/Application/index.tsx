import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { clearLocalStorage, getDataFromToken, getLocalStorageResource } from '../localStorageAPI';
import { SessionInfoContext } from '../SessionInfoContext';
import { PrivateRoute } from '../privateRoute';

import ComponentsPage from '../Pages/ComponentsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import AuthVerify from '../AuthVerify';
import ProfileEditPage from '../Pages/ProfileEditPage';

const Application = () => {
  const { setAccountType } = useContext(SessionInfoContext);

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
        <Route
          path={routes.logIn}
          element={
            <PrivateRoute destinationPath={routes.logIn} redirectPath={routes.home}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.register}
          element={
            <PrivateRoute destinationPath={routes.register} redirectPath={routes.home}>
              <RegistrationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.editProfile}
          element={
            <PrivateRoute destinationPath={routes.editProfile} redirectPath={routes.logIn}>
              <ProfileEditPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
};

export default Application;
