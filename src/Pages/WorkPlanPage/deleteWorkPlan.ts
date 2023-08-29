import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

const deleteWorkPlan = async (workPlanId: number) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error('Token expired'));

  return fetch(`${API_URL}/api/v1/work_plans/${workPlanId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default deleteWorkPlan;
