import pushNotification from 'pushNotification';
import { useState } from 'react';
import { capitalize } from 'lodash';
import { Col, Modal, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { API_URL } from 'api';
import { getAccountId, getLocalStorageResource } from 'localStorageAPI';

import useModal from 'Hooks/useModal';

import EditForm from 'Containers/WorkPlan/EditForm';

import Table, { TableRecord } from 'Components/Table';

import { DeleteButton, EditButton } from './styles';

export interface WorkPlan extends TableRecord {
  day_of_week: string;
  work_hour_start: number;
  work_hour_end: number;
}

interface ResponseBodyType {
  data: WorkPlan[];
  total: number;
}

interface WorkPlanTableProps {
  data: WorkPlan[];
  setData: (data: WorkPlan[]) => void;
}

const WorkPlanTable = ({ data, setData }: WorkPlanTableProps) => {
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
  const [record, setRecord] = useState<WorkPlan>({ id: 0, day_of_week: '', work_hour_start: 0, work_hour_end: 0 });

  const handleRemoveOk = async () => {
    await removeWorkDay(record.id);
    pushNotification('success', 'Success', 'Work day has been removed!');
    setData(data.filter((item) => item.id !== record.id));
    closeDeleteModal();
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
      render: (text: number) => `${text}:00`,
    },
    {
      title: 'Work hour end',
      dataIndex: 'work_hour_end',
      key: 'work_hour_end',
      render: (text: number) => `${text}:00`,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 1,
      render: (text: any, record: WorkPlan) => (
        <Row gutter={[0, 5]} justify="center" align="middle">
          <Col>
            <EditButton
              onClick={() => {
                openEditModal();
                setRecord(record);
              }}
            >
              <EditOutlined />
            </EditButton>
          </Col>
          <Col>
            <DeleteButton
              onClick={() => {
                openDeleteModal();
                setRecord(record);
              }}
            >
              <DeleteOutlined />
            </DeleteButton>
          </Col>
        </Row>
      ),
    },
  ];

  const doctorId = getAccountId();
  const perPage = 7;

  return (
    <>
      <Table<WorkPlan, ResponseBodyType>
        data={data}
        setData={setData}
        columns={columns}
        url={`${API_URL}/api/v1/doctors/${doctorId}/work_plans/?page=1&per_page=${perPage}`}
        extractData={(response: ResponseBodyType) => response.data}
        locale={{
          emptyText: `You haven't added any workday yet`,
        }}
      />
      <Modal
        title="Do you want to remove this workday?"
        open={isDeleteOpened}
        onOk={handleRemoveOk}
        onCancel={closeDeleteModal}
      />
      <Modal title="Edit workday" open={isEditOpened} onCancel={closeEditModal} footer={null}>
        <EditForm data={data} setData={setData} workPlan={record} closeEditModal={closeEditModal} />
      </Modal>
    </>
  );
};

export default WorkPlanTable;
