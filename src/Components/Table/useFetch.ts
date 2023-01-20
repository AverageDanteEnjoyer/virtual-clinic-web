import { useState, useEffect } from 'react';

import { getLocalStorageResource } from '../../localStorageAPI';

export const useFetch = <T>(url: string, ref: any, initialValue: T) => {
  const [responseData, setResponseData] = useState<T>(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = getLocalStorageResource('token');
  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          const responseBody = await response.json();
          setResponseData(responseBody);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      ref.current = false;
    };
  }, [url, ref]);

  return { loading, responseData, error };
};
