import { useContext, useMemo } from 'react';
import { Store } from './store';
import { useNavigate } from 'react-router-dom';
import { getDataFromToken } from './localStorageAPI';
import routes from './routes';

const AuthVerify = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  useMemo(() => {
    const { tokenExp } = getDataFromToken();
    if (tokenExp && tokenExp < new Date()) {
      dispatch({ type: 'logout' });
      navigate(routes.logIn, {
        state: {
          errors: [{ type: 'info', message: 'You have been logged out, please log in again!' }],
        },
      });
    }
  }, [navigate, dispatch]);

  return <></>;
};

export default AuthVerify;
