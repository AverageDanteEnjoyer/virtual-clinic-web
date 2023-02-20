import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';

import { FetchParams, FetchResponse, TableRecord } from 'Components/PaginatedTable';

export interface Procedure extends TableRecord {
  user_id: number;
  name: string;
  needed_time_min: number;
  created_at: string;
  updated_at: string;
}

const getDoctorProcedures = (doctorId: number) => {
  return async ({ page, perPage, filter }: FetchParams): Promise<FetchResponse<Procedure>> => {
    const token = getLocalStorageResource('token');
    if (!token) return { data: [], page, per_page: perPage, total: 0 };

    const filterString = Object.keys(filter)
      .map((key) => `${key}=${filter[key] as string}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/api/v1/doctors/${doctorId}/procedures/?page=${page}&per_page=${perPage}&${filterString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    return response.json();
  };
};

export default getDoctorProcedures;
