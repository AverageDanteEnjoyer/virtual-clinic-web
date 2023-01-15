import { useState } from 'react';
import { InputNumber } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { API_URL } from '../../api';
import { getAccountId, getLocalStorageResource } from '../../localStorageAPI';
import Table, { FetchResponse, TableRecord } from '../../Components/Table';
import Button from '../../Components/Button';

interface WorkPlan extends TableRecord {
  user_id: number;
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
  created_at: string;
  updated_at: string;
}

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const defaultData: WorkPlan[] = days.map((day) => ({
  id: 0,
  user_id: 0,
  day_of_week: day,
  work_hour_start: 0,
  work_hour_end: 0,
  created_at: '',
  updated_at: '',
}));

const ScheduleAddForm = () => {
  const [workHourStart, setWorkHourStart] = useState(Array(7).fill(0));
  const [workHourEnd, setWorkHourEnd] = useState(Array(7).fill(0));

  const handleWorkHourStartChange = (value: number, index: number) => {
    const newWorkHourStart = [...workHourStart];
    newWorkHourStart[index] = value;
    setWorkHourStart(newWorkHourStart);
  };

  const handleWorkHourEndChange = (value: number, index: number) => {
    const newWorkHourEnd = [...workHourEnd];
    newWorkHourEnd[index] = value;
    setWorkHourEnd(newWorkHourEnd);
  };

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
      render: (text: number, record: WorkPlan, index: number) => {
        return (
          <InputNumber
            min={0}
            max={23}
            value={workHourStart[index]}
            onChange={(val) => handleWorkHourStartChange(val, index)}
          />
        );
      },
    },
    {
      title: 'Work hour end',
      dataIndex: 'work_hour_end',
      key: 'work_hour_end',
      render: (text: number, record: WorkPlan, index: number) => {
        return (
          <InputNumber
            min={1}
            max={24}
            value={workHourEnd[index]}
            onChange={(val) => handleWorkHourEndChange(val, index)}
          />
        );
      },
    },
  ];

  const actions = (text: any, record: WorkPlan, index: number) => {
    return (
      <>
        <Button onClick={() => console.log(workHourStart[index], workHourEnd[index])}>Save</Button>
        <Button>Delete</Button>
      </>
    );
  };
  const fetchData = async (): Promise<FetchResponse<WorkPlan>> => {
    const token = getLocalStorageResource('token');
    if (!token) return { data: [] };

    const doctorId = getAccountId();
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

  return <Table fetchData={fetchData} columns={columns} actions={actions} rowKey={(record) => record.day_of_week} />;
};

export default ScheduleAddForm;
