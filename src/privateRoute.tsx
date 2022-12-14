import { Navigate } from 'react-router-dom';

import routes from './routes';
import { getLocalStorageResource } from './localStorageAPI';

type PrivateRouteProps = {
  children: JSX.Element;
  destinationPath: string;
  redirectPath: string;
};

export const PrivateRoute = ({ children, destinationPath, redirectPath }: PrivateRouteProps) => {
  const accountType = getLocalStorageResource('accountType');

  if (!accountType) {
    return <Navigate to={redirectPath} />;
  } else {
    if (destinationPath === routes.register) {
      return <Navigate to={redirectPath} />;
    }
  }

  return children;
};
