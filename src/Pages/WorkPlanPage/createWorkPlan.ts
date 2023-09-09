import { API_URL } from 'api';
import { type DayOfWeek } from './workPlanType';
import { getLocalStorageResource } from 'localStorageAPI';

export type CreateWorkPlanProps = {
  day_of_week: DayOfWeek;
  work_hour_start: number;
  work_hour_end: number;
};

const createWorkPlan = async (props: CreateWorkPlanProps) => {
  const token = getLocalStorageResource('token');
  if (!token) return Promise.reject(new Error('Token expired'));

  return fetch(`${API_URL}/api/v1/work_plans/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      work_plan: props,
    }),
  });
};

export default createWorkPlan;
