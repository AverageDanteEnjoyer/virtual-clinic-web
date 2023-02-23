import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';

import { FetchParams, FetchResponse } from 'Components/PaginatedTable';

import { Appointment } from './index';

const getAppointments = async ({ page, perPage }: FetchParams): Promise<FetchResponse<Appointment>> => {
  const token = getLocalStorageResource('token');
  if (!token) return { data: [], page, per_page: perPage, total: 0 };

  const response = await fetch(`${API_URL}/api/v1/appointments/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  return response.json();
};

export default getAppointments;
