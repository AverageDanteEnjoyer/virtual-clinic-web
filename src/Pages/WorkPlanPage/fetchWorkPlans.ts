import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

const fetchWorkPlans = async (doctorId?: number) => {
  if (!doctorId) return { data: [], error: 'Doctor id not found' };

  const token = getLocalStorageResource('token');
  if (!token) return { data: [], error: 'Token not found' };

  const res = await fetch(`${API_URL}/api/v1/doctors/${doctorId}/work_plans?per_page=1000`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  return res.json();
};

export default fetchWorkPlans;
