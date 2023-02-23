import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';

import { DoctorProceduresType } from 'Containers/DoctorManageProcedures/index';

const handleEdit = async ({ id, name, needed_time_min }: DoctorProceduresType) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error());

  return await fetch(`${API_URL}/api/v1/procedures/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      procedure: {
        name,
        needed_time_min,
      },
    }),
  });
};

export default handleEdit;
