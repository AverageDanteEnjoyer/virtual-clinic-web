import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';

const removeWorkDay = async (id: number) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error());

  return await fetch(`${API_URL}/api/v1/work_plans/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default removeWorkDay;
