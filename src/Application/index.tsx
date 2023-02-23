import { useContext, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import routes from 'routes';
import { getAccountType, getDataFromToken } from 'localStorageAPI';
import { Store } from 'store';
import AuthVerify from 'AuthVerify';
import { mappedPrivateRoutes } from 'mappedPrivateRoutes';

import ComponentsPage from 'Pages/ComponentsPage';
import HomePage from 'Pages/HomePage';

const Application = () => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    const { tokenExp } = getDataFromToken();
    if (!tokenExp) return;

    if (tokenExp < new Date()) {
      dispatch({ type: 'logout' });
    } else {
      dispatch({ type: 'login', payload: { accountType: getAccountType() } });
    }
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path={routes.home.path} element={<HomePage />} />
        {mappedPrivateRoutes}
      </Routes>
      <AuthVerify />
    </HashRouter>
  );
};

export default Application;
