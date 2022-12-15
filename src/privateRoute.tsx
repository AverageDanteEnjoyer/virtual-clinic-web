import { Navigate } from 'react-router-dom';

import routes from './routes';
import { getLocalStorageResource } from './localStorageAPI';
import { userType } from './SessionInfoContext';

type PrivateRouteProps = {
  children: JSX.Element;
  destinationPath: string;
  redirectPath: string;
};

export const PrivateRoute = ({ children, destinationPath, redirectPath }: PrivateRouteProps) => {
  const accountType = getLocalStorageResource('accountType') || userType.GUEST;

  if (accountType === userType.GUEST) {
    return <Navigate to={redirectPath} />;
  } else {
    if (destinationPath === routes.register) {
      return <Navigate to={redirectPath} />;
    }
  }

  return children;
};
