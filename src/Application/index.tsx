import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { getAccountType, getDataFromToken } from '../localStorageAPI';
import { Store } from '../store';

import ComponentsPage from '../Pages/ComponentsPage';
import HomePage from '../Pages/HomePage';
import AuthVerify from '../AuthVerify';
import { mappedPrivateRoutes } from '../mappedPrivateRoutes';

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
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.components} element={<ComponentsPage />} />
        {mappedPrivateRoutes}
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
};

export default Application;
