import { Procedure } from '.';
import { FetchResponse, SearchParameters } from '../../Components/PaginatedSelect';
import { getLocalStorageResource } from '../../localStorageAPI';

export const getFetchDoctorProcedures = (doctorId: number) => {
  return async ({ searchValue, pageIndex, perPage }: SearchParameters): Promise<FetchResponse<Procedure>> => {
    const token = getLocalStorageResource('token');
    if (!token) return { data: [], total: 0 };

    const response = await fetch(
      `/api/v1/doctors/${doctorId}/procedures?name=${searchValue}&page=${pageIndex}&per_page=${perPage}`,
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
