import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import { FormData } from 'Containers/DoctorManageProcedures/index';

const addProcedure = async (values: FormData) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error());

  return await fetch(`${API_URL}/api/v1/procedures`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'POST',
    body: JSON.stringify({
      procedure: {
        name: values.name,
        needed_time_min: values.needed_time_min,
      },
    }),
  });
};

export default addProcedure;
