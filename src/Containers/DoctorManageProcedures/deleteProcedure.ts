import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import { DoctorProceduresType } from './index';

const handleDelete = async ({ id, name, needed_time_min }: DoctorProceduresType) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error());

  return await fetch(`${API_URL}/api/v1/procedures/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'DELETE',
    body: JSON.stringify({
      procedure: {
        name,
        needed_time_min,
      },
    }),
  });
};

export default handleDelete;
