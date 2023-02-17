import { FetchParams, FetchResponse } from 'Components/PaginatedTable';
import { getLocalStorageResource } from 'localStorageAPI';

import { Appointment } from './index';

const data: Appointment[] = [
  {
    id: 88,
    start_time: '2023-02-16T12:30:00.000Z',
    doctor: {
      id: 30,
      first_name: 'Jan',
      last_name: 'Kowalski',
      email: 'jan@kowal',
    },
    patient: {
      id: 50,
      first_name: 'Michal',
      last_name: 'Kowalski',
      email: 'michal@kowal',
    },
    procedure: {
      id: 47,
      name: 'Appointment',
      needed_time_min: 30,
    },
  },
  {
    id: 88,
    start_time: '2023-02-16T12:30:00.000Z',
    doctor: {
      id: 30,
      first_name: 'Jan',
      last_name: 'Kowalski',
      email: 'jan@kowal',
    },
    patient: {
      id: 50,
      first_name: 'Michal',
      last_name: 'Kowalski',
      email: 'michal@kowal',
    },
    procedure: {
      id: 47,
      name: 'Appointment',
      needed_time_min: 30,
    },
  },
  {
    id: 88,
    start_time: '2023-02-16T12:30:00.000Z',
    doctor: {
      id: 30,
      first_name: 'Jan',
      last_name: 'Kowalski',
      email: 'jan@kowal',
    },
    patient: {
      id: 50,
      first_name: 'Michal',
      last_name: 'Kowalski',
      email: 'michal@kowal',
    },
    procedure: {
      id: 47,
      name: 'Appointment',
      needed_time_min: 30,
    },
  },
];

const response = {
  data: data,
  page: 1,
  per_page: 5,
  total: 1,
};

const getAppointments = (id: number) => {
  return async ({ page, perPage }: FetchParams): Promise<FetchResponse<Appointment>> => {
    const token = getLocalStorageResource('token');
    if (!token) return { data: [], page, per_page: perPage, total: 0 };

    // It's a mock, so I'm not using fetch

    // const response = await fetch(``, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: token,
    //   },
    // });
    //
    // return response.json();
    return Promise.resolve(response);
  };
};

export default getAppointments;
