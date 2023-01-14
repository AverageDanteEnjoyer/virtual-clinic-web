import { API_URL } from '../../api';
import { getAccountId, getLocalStorageResource } from '../../localStorageAPI';
import { StyledTitle } from '../../Components/Typography/styles';

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
  const fetchWorkPlanData = async (credentials: plan) => {
    const token = getLocalStorageResource('token');
    const id = getAccountId();

    return await fetch(`${API_URL}/api/v1/doctors/${id}/work_plans/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(credentials),
    });
  };

  return <StyledTitle>Work plan edit</StyledTitle>;
};

export default ScheduleAddForm;
