import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { capitalize } from 'lodash';
import { Col, Modal, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';

import { API_URL } from 'api';
import { getAccountId } from 'localStorageAPI';
import pushNotification from 'pushNotification';
import routes from 'routes';
import { Store } from 'store';
import palette from 'palette';

import useModal from 'Hooks/useModal';

import EditForm from 'Containers/WorkPlan/EditForm';
import removeWorkDay from 'Containers/WorkPlan/WorkPlanTable/deleteWorkday';

import Table, { TableRecord } from 'Components/Table';
import { StyledTitle } from 'Components/Typography/styles';

import { DeleteButton, EditButton } from './styles';
import dayjs from 'dayjs';

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
  const [record, setRecord] = useState<WorkPlan>({ id: 0, day_of_week: '', work_hour_start: 0, work_hour_end: 0 });
  const [formState, setFormState] = useState(Date.now());
  const { isOpened: isEditOpened, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { dispatch } = useContext(Store);
  const { confirm } = Modal;
  const navigate = useNavigate();

  const handleRemoveOk = async (record: WorkPlan) => {
    try {
      const response = await removeWorkDay(record.id);
      if (response.ok) {
        pushNotification('success', 'Success', 'Workday has been removed!');
        setData(data.filter((item) => item.id !== record.id));
      }
    } catch {
      pushNotification('error', 'Error', 'Something went wrong!');
      dispatch({ type: 'logout' });
      navigate(routes.logIn.path);
    }
  };

  const onClose = () => {
    closeEditModal();
    setFormState(Date.now());
  };

  const showConfirm = async (record: WorkPlan) => {
    confirm({
      title: 'Do you want to delete this workday?',
      icon: (
        <ExclamationCircleTwoTone twoToneColor={[palette.white, palette.ultraViolet]} style={{ fontSize: '40px' }} />
      ),
      okText: 'Yes',
      cancelText: 'No',
      autoFocusButton: 'cancel',
      okButtonProps: {
        style: {
          backgroundColor: palette.ultraViolet,
        },
      },
      onOk() {
        handleRemoveOk(record);
      },
    });
  };

  const renderHour = (hour: number) => dayjs().hour(hour).minute(0).format('h:mm A');

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
      render: renderHour,
    },
    {
      title: 'Work hour end',
      dataIndex: 'work_hour_end',
      key: 'work_hour_end',
      render: renderHour,
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
              onClick={async () => {
                await showConfirm(record);
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
          emptyText: "You haven't added any workday yet",
        }}
      />
      <Modal
        title={
          <StyledTitle level={2} centered>
            Edit workday hours
          </StyledTitle>
        }
        onCancel={onClose}
        footer={null}
        open={isEditOpened}
        centered
      >
        <Row>
          <Col xs={{ span: 20, offset: 2 }}>
            <EditForm data={data} setData={setData} workPlan={record} closeEditModal={onClose} key={formState} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default WorkPlanTable;
