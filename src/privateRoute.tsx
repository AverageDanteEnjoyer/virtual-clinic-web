import { Navigate } from 'react-router-dom';

import { getAccountType } from './localStorageAPI';

export const equals = (expectedAccountType: string): boolean => getAccountType() === expectedAccountType;

export const notEquals = (expectedAccountType: string): boolean => getAccountType() !== expectedAccountType;

type PrivateRouteProps = {
  children: JSX.Element;
  redirectPath: string;
  condition: () => boolean;
};

export const PrivateRoute = ({ children, redirectPath, condition }: PrivateRouteProps) => {
  return condition() ? children : <Navigate to={redirectPath} />;
};
