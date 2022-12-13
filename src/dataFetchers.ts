import { searchParameters } from './Containers/PaginatedSelect';
import { getDataFromToken, getLocalStorageResource } from './localStorageAPI';
import { API_URL } from './api';

export const fetchAllProfessions = async ({ name, perPage, pageIndex }: searchParameters) => {
  const token = getLocalStorageResource('token');
  if (!token) return;
  return fetch(`${API_URL}/api/v1/professions/?name=${name}&per_page=${perPage}&page=${pageIndex}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((response) => response.json());
};

export const fetchDoctorProfessions = async () => {
  const token = getLocalStorageResource('token');
  const { userID } = getDataFromToken();
  if (!token) return;
  return await fetch(`${API_URL}/api/v1/doctors/${userID}/professions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((response) => response.json());
};
