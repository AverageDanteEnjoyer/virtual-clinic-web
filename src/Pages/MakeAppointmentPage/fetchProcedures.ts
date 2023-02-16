import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

import { SearchParameters, FetchResponse } from 'Components/PaginatedSelect';

import { Procedure } from '.';

const fetchProcedures = async ({
  searchValue,
  perPage,
  pageIndex,
}: SearchParameters): Promise<FetchResponse<Procedure>> => {
  const token = getLocalStorageResource('token');
  if (!token) return { data: [], total: 0 };

  const response = await fetch(
    `${API_URL}/api/v1/procedures?name=${searchValue}&per_page=${perPage}&page=${pageIndex}`,
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

export default fetchProcedures;
