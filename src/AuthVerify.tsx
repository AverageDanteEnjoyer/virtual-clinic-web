import { useContext, useMemo } from 'react';
import { SessionInfoContext, userType } from './SessionInfoContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDataFromToken, removeToken } from './tokenApi';
import routes from './routes';

const AuthVerify = () => {
  const { setAccountType, setUserID } = useContext(SessionInfoContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { tokenExp } = getDataFromToken();

  useMemo(() => {
    if (tokenExp && tokenExp < new Date()) {
      removeToken();
      setUserID(0);
      setAccountType(userType.GUEST);
      navigate(routes.logIn);
    }
  }, [location]);

  return <></>;
};

export default AuthVerify;
