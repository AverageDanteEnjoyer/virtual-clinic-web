import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

import { UserInfo } from '.';

const updateUser = async (credentials: { user: UserInfo }) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject('No token');

  return await fetch(`${API_URL}/users/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(credentials),
  });
};

export default updateUser;
