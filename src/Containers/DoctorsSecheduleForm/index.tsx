import { API_URL } from '../../api';
import { getAccountId, getLocalStorageResource } from '../../localStorageAPI';

type data = {
  id: number;
  user_id: number;
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
  created_at: string;
  updated_at: string;
};

type plan = {
  data: data[];
  total: number;
  page: number;
  per_page: number;
};

const ScheduleAddForm = () => {
  const fetchWorkPlanData = async () => {
    const token = getLocalStorageResource('token');
    const id = getAccountId();

    const response = await fetch(`${API_URL}/api/v1/doctors/${id}/work_plans/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return response.json();
  };
};

export default ScheduleAddForm;
