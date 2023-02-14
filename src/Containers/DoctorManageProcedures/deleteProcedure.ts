import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import { DoctorProceduresType } from './index';

const handleDelete = async (record: DoctorProceduresType) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error());

  const { name, needed_time_min }: DoctorProceduresType = record;

  return await fetch(`${API_URL}/api/v1/procedures/${record.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'DELETE',
    body: JSON.stringify({
      procedure: {
        name: name,
        needed_time_min: needed_time_min,
      },
    }),
  });
};

export default handleDelete;
