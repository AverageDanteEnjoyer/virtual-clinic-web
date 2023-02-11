import { SearchParameters, FetchResponse } from 'Components/PaginatedSelect';
import { Doctor } from './index';
import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';

export const fetchAllDoctors = async ({
  searchValue,
  perPage,
  pageIndex,
}: SearchParameters): Promise<FetchResponse<Doctor>> => {
  const token = getLocalStorageResource('token');
  if (!token) return { data: [], total: 0 };

  const response = await fetch(
    `${API_URL}/api/v1/doctors/?first_name=${searchValue}&per_page=${perPage}&page=${pageIndex}`,
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

export default fetchAllDoctors;
