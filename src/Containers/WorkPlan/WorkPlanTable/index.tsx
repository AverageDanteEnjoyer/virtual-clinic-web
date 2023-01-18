import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

import { API_URL } from '../../../api';
import { getAccountId, getLocalStorageResource } from '../../../localStorageAPI';
import Table, { FetchResponse, TableRecord } from '../../../Components/Table';
import Button from '../../../Components/Button';

interface WorkPlan extends TableRecord {
  user_id: number;
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
  created_at: string;
  updated_at: string;
}

const WorkPlanTable = () => {
  const columns: ColumnsType<WorkPlan> = [
    {
      title: 'Day of week',
      dataIndex: 'day_of_week',
      key: 'day_of_week',
      render: (text: string) => {
        return _.capitalize(text);
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
  ];

  const actions = (text: any, record: WorkPlan, index: number) => (
    <>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </>
  );
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

    return response.json();
  };

  return <Table fetchData={fetchData} columns={columns} actions={actions} />;
};

export default WorkPlanTable;
