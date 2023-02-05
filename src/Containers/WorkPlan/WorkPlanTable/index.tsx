import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { capitalize } from 'lodash';
import { Modal } from 'antd';

import { API_URL } from '../../../api';
import { getAccountId, getLocalStorageResource } from '../../../localStorageAPI';
import Table, { TableRecord } from '../../../Components/Table';
import Button from '../../../Components/Button';
import useModal from './useModal';

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

  const { isOpened: isEditOpened, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpened: isDeleteOpened, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const [modalData, setModalData] = useState(0);

  const showDeleteModal = (id: number) => {
    openDeleteModal();
    setModalData(id);
  };

  const handleRemoveOk = async () => {
    await removeWorkDay(modalData);
    closeDeleteModal();
  };

  const showEditModal = () => {
    openEditModal();
  };

  const handleEditOk = () => {
    closeEditModal();
  };

  const columns: ColumnsType<WorkPlan> = [
    {
      title: 'Day of week',
      dataIndex: 'day_of_week',
      key: 'day_of_week',
      render: (text: string) => capitalize(text),
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
      render: (text: any, record: WorkPlan) => (
        <>
          <Button onClick={() => showEditModal()}>Edit</Button>
          <Button onClick={() => showDeleteModal(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const doctorId = getAccountId();
  const perPage = 7;

  return (
    <>
      <Table<WorkPlan, ResponseBodyType>
        columns={columns}
        url={`${API_URL}/api/v1/doctors/${doctorId}/work_plans/?page=1&per_page=${perPage}`}
        extractData={(response: ResponseBodyType) => response.data}
        tableRerenderRef={tableRerenderRef}
      />
      <Modal
        title="Do you want to remove this workday?"
        open={isDeleteOpened}
        onOk={handleRemoveOk}
        onCancel={closeDeleteModal}
      />
      <Modal title="Edit workday" open={isEditOpened} onOk={handleEditOk} onCancel={closeEditModal} />
    </>
  );
};

export default WorkPlanTable;
