import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import routes from 'routes';
import { Store } from 'store';

const useTitle = (title?: string) => {
  const { dispatch } = useContext(Store);
  const location = useLocation();

  useEffect(() => {
    const route = Object.values(routes).find((route) => route.path === location.pathname);
    dispatch({ type: 'setTitle', payload: { title: title || route?.title || 'Virtual Clinic' } });
  }, [location, dispatch]);
};

export default useTitle;
