import { useContext, useMemo } from 'react';
import { SessionInfoContext, userType } from './SessionInfoContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearLocalStorage, getDataFromToken } from './localStorageAPI';
import routes from './routes';

const AuthVerify = () => {
  const { setAccountType } = useContext(SessionInfoContext);
  const location = useLocation();
  const navigate = useNavigate();

  useMemo(() => {
    const { tokenExp } = getDataFromToken();
    if (tokenExp && tokenExp < new Date()) {
      clearLocalStorage();
      setAccountType(userType.GUEST);
      navigate(routes.logIn);
    }
  }, [location, setAccountType]);

  return <></>;
};

export default AuthVerify;
