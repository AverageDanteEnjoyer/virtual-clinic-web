import { API_URL } from '../../api';
import { getLocalStorageResource } from '../../localStorageAPI';

export const fetchAvailableAppointmentHours = async (
  date: string,
  procedureId: number
): Promise<{ data: string[]; error: boolean }> => {
  const token = getLocalStorageResource('token');
  if (!token) return { data: [], error: true };

  // Transform date from YYYY-MM-DD to DD-MM-YYYY format
  const [year, month, day] = date.split('-');
  date = `${day}-${month}-${year}`;

  const res = await fetch(`${API_URL}/api/v1/appointments/availability?date=${date}&procedure_id=${procedureId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return { data: data.data, error: false };
  } else {
    return { data: [], error: true };
  }
};
