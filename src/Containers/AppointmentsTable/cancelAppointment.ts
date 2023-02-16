import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import { Appointment } from 'Containers/AppointmentsTable/index';

const cancelAppointment = async (record: Appointment) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error());

  return await fetch(`${API_URL}/api/v1/appointments/${record.id}/cancellation`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    method: 'GET',
  });
};

export default cancelAppointment;
