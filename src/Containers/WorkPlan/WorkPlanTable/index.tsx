import { ColumnsType } from 'antd/es/table';
import { capitalize } from 'lodash';

import { API_URL } from '../../../api';
import { getAccountId, getLocalStorageResource } from '../../../localStorageAPI';
import Table, { FetchResponse, TableRecord } from '../../../Components/Table';
import Button from '../../../Components/Button';
import { Ref } from 'react';

export interface WorkPlan extends TableRecord {
  user_id: number;
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
  created_at: string;
  updated_at: string;
}

interface ResponseBodyType {
  data: WorkPlan[];
  total: number;
  page: number;
  per_page: number;
}

interface WorkPlanTableProps {
  tableRerenderRef: any;
}

const WorkPlanTable = ({ tableRerenderRef }: WorkPlanTableProps) => {
  const removeWorkDay = async (id: number) => {
    const token = getLocalStorageResource('token');

    await fetch(`${API_URL}/api/v1/work_plans/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  };

  const columns: ColumnsType<WorkPlan> = [
    {
      title: 'Day of week',
      dataIndex: 'day_of_week',
      key: 'day_of_week',
      render: (text: string) => {
        return capitalize(text);
      },
    },
    {
      title: 'Work hour start',
      dataIndex: 'work_hour_start',
      key: 'work_hour_start',
    },
    {
      title: 'Work hour end',
      dataIndex: 'work_hour_end',
      key: 'work_hour_end',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: WorkPlan, index: number) => (
        <>
          <Button>Edit</Button>
          <Button onClick={() => removeWorkDay(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const doctorId = getAccountId();

  return (
    <Table<WorkPlan, ResponseBodyType>
      columns={columns}
      url={`${API_URL}/api/v1/doctors/${doctorId}/work_plans/?page=1&per_page=7`}
      extractData={(response: ResponseBodyType) => response.data}
      tableRerenderRef={tableRerenderRef}
    />
  );
};

export default WorkPlanTable;
