import { FetchResponse, SearchParameters } from '../../Components/PaginatedSelect';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';
import { Profession } from './index';

export const fetchAllProfessions = async ({
  searchValue,
  perPage,
  pageIndex,
}: SearchParameters): Promise<FetchResponse<Profession>> => {
  const token = getLocalStorageResource('token');
  if (!token) return { data: [], total: 0 };

  const response = await fetch(
    `${API_URL}/api/v1/professions/?name=${searchValue}&per_page=${perPage}&page=${pageIndex}`,
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

export const fetchDoctorProfessions = async (): Promise<Profession[]> => {
  const token = getLocalStorageResource('token');
  if (!token) return [];
  const { userID } = getDataFromToken();

  const response = await fetch(`${API_URL}/api/v1/doctors/${userID}/professions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const responseBody = await response.json();
  return responseBody.data;
};

export const createNewProfession = async (option: string) => {
  const token = getLocalStorageResource('token');
  if (!token) return { success: false, message: 'Token expired' };

  const response = await fetch(`${API_URL}/api/v1/professions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ profession: { name: option } }),
  });
  const responseBody = await response.json();
  return {
    success: Boolean(responseBody.data),
    message: responseBody.errors ? responseBody.errors.name : '',
  };
};
