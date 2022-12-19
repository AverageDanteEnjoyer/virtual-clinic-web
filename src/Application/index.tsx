import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { clearLocalStorage, getAccountType, getDataFromToken } from '../localStorageAPI';
import { SessionInfoContext } from '../SessionInfoContext';
import { PrivateRoute, equals, notEquals } from '../privateRoute';

import { userType } from '../SessionInfoContext';
import ComponentsPage from '../Pages/ComponentsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import AuthVerify from '../AuthVerify';
import ProfileEditPage from '../Pages/ProfileEditPage';

interface privateRouteItem {
  path: string;
  children: JSX.Element;
  redirectPath: string;
  condition: () => boolean;
}

const Application = () => {
  const { setAccountType } = useContext(SessionInfoContext);

  useEffect(() => {
    const { tokenExp } = getDataFromToken();
    if (!tokenExp) return;

    if (tokenExp < new Date()) {
      clearLocalStorage();
    } else {
      setAccountType(getAccountType());
    }
  }, []);

  const privateRouteItems: privateRouteItem[] = [
    {
      path: routes.logIn,
      children: <LoginPage />,
      redirectPath: routes.home,
      condition: () => equals(userType.GUEST),
    },
    {
      path: routes.register,
      children: <RegistrationPage />,
      redirectPath: routes.home,
      condition: () => equals(userType.GUEST),
    },
    {
      path: routes.editProfile,
      children: <ProfileEditPage />,
      redirectPath: routes.logIn,
      condition: () => notEquals(userType.GUEST),
    },
  ];

  const privateRouteItemsJSX = privateRouteItems.map(({ path, children, redirectPath, condition }) => (
    <Route
      path={path}
      element={
        <PrivateRoute redirectPath={redirectPath} condition={condition}>
          {children}
        </PrivateRoute>
      }
    />
  ));

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.components} element={<ComponentsPage />} />
        {privateRouteItemsJSX}
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
};

export default Application;
