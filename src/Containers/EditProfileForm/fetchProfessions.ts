import { searchParameters } from '../../Components/PaginatedSelect';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

export const fetchAllProfessions = async ({ name, perPage, pageIndex }: searchParameters) => {
  const token = getLocalStorageResource('token');
  if (!token) return;

  return fetch(`${API_URL}/api/v1/professions/?name=${name}&per_page=${perPage}&page=${pageIndex}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((responseBody) => ({
      options: responseBody.data.map((value: { key: number; name: string }) => value.name),
      total: responseBody.total,
    }));
};

export const fetchDoctorProfessions = async () => {
  const token = getLocalStorageResource('token');
  if (!token) return;
  const { userID } = getDataFromToken();

  return await fetch(`${API_URL}/api/v1/doctors/${userID}/professions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((responseBody) => responseBody.data.map((value: { key: number; name: string }) => value.name));
};

export const createNewProfession = async (option: string) => {
  const token = getLocalStorageResource('token');
  if (!token) return { success: false, message: 'Token expired' };

  return fetch(`${API_URL}/api/v1/professions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ profession: { name: option } }),
  })
    .then((response) => response.json())
    .then((responseBody) => ({
      success: Boolean(responseBody.data),
      message: responseBody.errors ? responseBody.errors.name : '',
    }));
};