import { searchParameters } from '../../Components/PaginatedSelect';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

export const fetchAllProfessions = async ({ name, perPage, pageIndex }: searchParameters) => {
  const token = getLocalStorageResource('token');
  if (!token) return;

  const response = await fetch(`${API_URL}/api/v1/professions/?name=${name}&per_page=${perPage}&page=${pageIndex}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const responseBody = await response.json();
  return {
    options: responseBody.data.map((value: { key: number; name: string }) => value.name),
    total: responseBody.total,
  };
};

export const fetchDoctorProfessions = async () => {
  const token = getLocalStorageResource('token');
  if (!token) return;
  const { userID } = getDataFromToken();

  const response = await fetch(`${API_URL}/api/v1/doctors/${userID}/professions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const responseBody = await response.json();
  return responseBody.data.map((value: { key: number; name: string }) => value.name);
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
