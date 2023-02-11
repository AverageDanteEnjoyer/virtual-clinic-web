import { useState, useEffect, useRef } from 'react';

import { getLocalStorageResource } from 'localStorageAPI';

const noBodyResponseStatuses = [204, 401];

type methodType = 'GET' | 'PUT' | 'POST' | 'DELETE';

export const useFetch = <T>(url: string, initialValue: T, method: methodType = 'GET') => {
  const [responseData, setResponseData] = useState<T>(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(true);

  const token = getLocalStorageResource('token');
  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          if (!noBodyResponseStatuses.includes(response.status)) {
            const responseBody = await response.json();
            setResponseData(responseBody);
          }
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
