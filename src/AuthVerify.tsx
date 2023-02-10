import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { Store } from './store';
import { getDataFromToken } from './localStorageAPI';
import routes from './routes';
import pushNotification from './pushNotification';

const AuthVerify = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const checkToken = useMemo(() => {
    return debounce(() => {
      const { tokenExp } = getDataFromToken();
      if (tokenExp && tokenExp < new Date()) {
        dispatch({ type: 'logout' });
        pushNotification('info', 'Session Expired', 'Please log in again.');
        navigate(routes.logIn.path);
      }
    }, 1000);
  }, [dispatch, navigate]);

  useEffect(() => {
    checkToken();
    const intervalId = setInterval(checkToken, 1000);
    return () => clearInterval(intervalId);
  }, [checkToken]);

  return null;
};

export default AuthVerify;
