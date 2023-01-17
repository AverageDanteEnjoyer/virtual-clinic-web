import { getLocalStorageResource } from '../../../localStorageAPI';
import { API_URL } from '../../../api';

export interface WorkPlanBody {
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
}

const fetchCreate = async (body: WorkPlanBody) => {
  const token = getLocalStorageResource('token');
  if (!token) return;

  const response = await fetch(`${API_URL}/api/v1/work_plans/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ work_plan: body }),
  });

  return response.json();
};

export default fetchCreate;
