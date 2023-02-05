import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { clearLocalStorage, getAccountType, getDataFromToken } from '../localStorageAPI';
import { SessionInfoContext } from '../SessionInfoContext';

import ComponentsPage from '../Pages/ComponentsPage';
import HomePage from '../Pages/HomePage';
import AuthVerify from '../AuthVerify';
import { mappedPrivateRoutes } from '../mappedPrivateRoutes';

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
  }, [setAccountType]);

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
