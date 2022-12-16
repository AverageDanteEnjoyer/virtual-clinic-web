import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { clearLocalStorage, getDataFromToken, getLocalStorageResource } from '../localStorageAPI';
import { SessionInfoContext } from '../SessionInfoContext';
import { PrivateRoute, equals, notEquals } from '../privateRoute';

import { userType } from '../SessionInfoContext';
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
            <PrivateRoute redirectPath={routes.home} condition={() => equals(userType.GUEST)}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.register}
          element={
            <PrivateRoute redirectPath={routes.home} condition={() => equals(userType.GUEST)}>
              <RegistrationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.editProfile}
          element={
            <PrivateRoute redirectPath={routes.logIn} condition={() => notEquals(userType.GUEST)}>
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
