import { Navigate } from 'react-router-dom';

import routes from './routes';

type ProtectedRouteProps = {
  accountType: string;
  children: JSX.Element;
};

export const ProtectedRoutes = ({ accountType, children }: ProtectedRouteProps) => {
  return accountType === 'guest' ? <Navigate to={routes.logIn} replace /> : children;
};
