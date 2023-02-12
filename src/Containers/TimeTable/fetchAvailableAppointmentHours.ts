import dayjs from 'dayjs';

import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

export enum Status {
  NON_WORKING_DAY = 'NON_WORKING_DAY',
  AVAILABLE = 'AVAILABLE',
  ERROR = 'ERROR',
}

export const fetchAvailableAppointmentHours = async (
  date: string,
  procedureId: number
): Promise<{ data: string[]; status: Status }> => {
  const token = getLocalStorageResource('token');
  if (!token) return { data: [], status: Status.ERROR };

  // Transform date from YYYY-MM-DD to DD-MM-YYYY format.
  date = dayjs(date).format('DD-MM-YYYY');

  const res = await fetch(`${API_URL}/api/v1/appointments/availability?date=${date}&procedure_id=${procedureId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (res.ok) {
    const { data } = await res.json();
    return { data, status: Status.AVAILABLE };
  } else {
    if (res.status === 404) return { data: [], status: Status.NON_WORKING_DAY };
    return { data: [], status: Status.ERROR };
  }
};
