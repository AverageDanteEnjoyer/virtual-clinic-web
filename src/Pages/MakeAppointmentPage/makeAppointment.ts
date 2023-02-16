import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

const makeAppointment = async (procedureId: number, date: string, time: string) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error('Token expired'));

  return fetch(`${API_URL}/api/v1/appointments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      appointment: {
        procedure_id: procedureId,
        start_time: `${date} ${time}`,
      },
    }),
  });
};

export default makeAppointment;
