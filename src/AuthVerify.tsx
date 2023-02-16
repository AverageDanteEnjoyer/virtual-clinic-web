import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo } from 'react';

import routes from 'routes';
import { Store } from 'store';
import pushNotification from 'pushNotification';
import { getDataFromToken } from 'localStorageAPI';

const AuthVerify = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const checkToken = useMemo(() => {
    return () => {
      const { tokenExp } = getDataFromToken();
      if (tokenExp && tokenExp < new Date()) {
        dispatch({ type: 'logout' });
        pushNotification('info', 'Session Expired', 'Please log in again.', 0);
        navigate(routes.logIn.path);
      }
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    checkToken();
    const intervalId = setInterval(checkToken, 1000);
    return () => clearInterval(intervalId);
  }, [checkToken]);

  return null;
};

export default AuthVerify;
