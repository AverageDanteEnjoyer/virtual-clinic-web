import { Navigate } from 'react-router-dom';

import { getAccountType } from './localStorageAPI';

export const equals = (expectedAccountType: string): boolean => {
  const accountType = getAccountType();
  return accountType === expectedAccountType;
};

export const notEquals = (expectedAccountType: string): boolean => {
  const accountType = getAccountType();
  return accountType !== expectedAccountType;
};

type PrivateRouteProps = {
  children: JSX.Element;
  redirectPath: string;
  condition: () => boolean;
};

export const PrivateRoute = ({ children, redirectPath, condition }: PrivateRouteProps) => {
  return condition() ? children : <Navigate to={redirectPath} />;
};
