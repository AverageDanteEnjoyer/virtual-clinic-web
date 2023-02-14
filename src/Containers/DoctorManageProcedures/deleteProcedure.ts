import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import pushNotification from 'pushNotification';
import { DoctorProceduresType } from './index';

const handleDelete = async (record: DoctorProceduresType) => {
  const token = getLocalStorageResource('token');
  if (!token) return;

  const response = await fetch(`${API_URL}/api/v1/procedures/${record.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'DELETE',
    body: JSON.stringify({
      procedure: {
        name: record.name,
        needed_time_min: record.needed_time_min,
      },
    }),
  });

  if (response.ok) {
    pushNotification('success', 'Success', 'Procedure has been deleted!');
  }
};

export default handleDelete;
