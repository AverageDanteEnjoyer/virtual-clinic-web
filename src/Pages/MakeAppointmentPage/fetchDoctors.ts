import { searchParameters } from '../../Components/PaginatedSelect';
import { getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

export const fetchAllDoctors = async ({ name, perPage, pageIndex }: searchParameters) => {
  const token = getLocalStorageResource('token');
  if (!token) return;

  const response = await fetch(`${API_URL}/api/v1/doctors?per_page${perPage}&page=${pageIndex}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const responseBody = await response.json();
  console.log(responseBody);
  return {
    options: responseBody.data.map((value: { key: number; email: string }) => value.email),
    total: responseBody.total,
  };
};

export default fetchAllDoctors;
