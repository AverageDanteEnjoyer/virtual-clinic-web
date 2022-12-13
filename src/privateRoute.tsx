type ProtectedRouteProps = {
  accountType: string;
  children: JSX.Element;
  redirectPage: JSX.Element;
};

export const ProtectedRoutes = ({ accountType, children, redirectPage }: ProtectedRouteProps) => {
  if (accountType === 'guest') {
    return redirectPage;
  }

  return children;
};
