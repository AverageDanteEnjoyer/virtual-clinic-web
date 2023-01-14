import { API_URL } from '../../api';
import { InputNumber, TimePicker } from 'antd';
import Table, { FetchResponse, TableRecord } from '../../Components/Table';
import { getAccountId, getLocalStorageResource } from '../../localStorageAPI';
import { ColumnsType } from 'antd/es/table';

import dayjs from 'dayjs';
import Button from '../../Components/Button';

interface WorkPlan extends TableRecord {
  user_id: number;
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
  created_at: string;
  updated_at: string;
}

const defaultData: WorkPlan[] = [
  {
    id: 0,
    day_of_week: 'sunday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
  {
    id: 0,
    day_of_week: 'monday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
  {
    id: 0,
    day_of_week: 'tuesday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
  {
    id: 0,
    day_of_week: 'wednesday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
  {
    id: 0,
    day_of_week: 'thursday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
  {
    id: 0,
    day_of_week: 'friday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
  {
    id: 0,
    day_of_week: 'saturday',
    work_hour_start: 0,
    work_hour_end: 0,
  } as WorkPlan,
];

const columns: ColumnsType<WorkPlan> = [
  {
    title: 'Day of week',
    dataIndex: 'day_of_week',
    key: 'day_of_week',
    render: (text: string) => {
      return text[0].toUpperCase() + text.slice(1);
    },
  },
  {
    title: 'Work hour start',
    dataIndex: 'work_hour_start',
    key: 'work_hour_start',
    render: (text: number, record: WorkPlan) => {
      return <InputNumber min={0} max={23} defaultValue={text} />;
    },
  },
  {
    title: 'Work hour end',
    dataIndex: 'work_hour_end',
    key: 'work_hour_end',
    render: (text: number, record: WorkPlan) => {
      return (
        <InputNumber
          min={record.work_hour_start}
          max={23}
          defaultValue={text}
          onChange={(e: any) => (record.work_hour_end = e.target.value)}
        />
      );
    },
  },
];

const ScheduleAddForm = () => {
  const actions = (text: any, record: WorkPlan, index: number) => {
    return (
      <>
        <Button onClick={() => console.log(text)}>Save</Button>
        <Button>Delete</Button>
      </>
    );
  };
  const fetchData = async (): Promise<FetchResponse<WorkPlan>> => {
    const token = getLocalStorageResource('token');
    if (!token) return { data: [] };

    const doctorId = getAccountId();
    console.log(doctorId, token);
    const response = await fetch(`${API_URL}/api/v1/doctors/${doctorId}/work_plans/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (!response.ok) return response.json();

    const data = await response.json();
    defaultData.forEach((item) => {
      const found = data.data.find((element: WorkPlan) => element.day_of_week === item.day_of_week);
      if (found) {
        item.work_hour_start = found.work_hour_start;
        item.work_hour_end = found.work_hour_end;
      }
    });

    data.data = defaultData;
    return Promise.resolve(data);
  };

  return <Table fetchData={fetchData} columns={columns} actions={actions} />;
};

export default ScheduleAddForm;
