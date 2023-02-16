import { useContext, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

import PaginatedTable from 'Components/PaginatedTable';
import getAppointments from 'Containers/AppointmentsTable/fetchAppointments';
import { Store, userType } from 'store';
import DeleteButton from 'Components/DeleteButton';
import cancelAppointment from 'Containers/AppointmentsTable/cancelAppointment';
import pushNotification from 'pushNotification';
import routes from 'routes';
import { API_URL } from 'api';
import { getDataFromToken } from 'localStorageAPI';

interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Procedure {
  id: number;
  name: string;
  needed_time_min: number;
}

export interface Appointment {
  id: number;
  start_time: string;
  doctor: UserInfo;
  patient: UserInfo;
  procedure: Procedure;
}

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tableState, setTableState] = useState(Date.now());
  const { dispatch, state } = useContext(Store);
  const { userID } = getDataFromToken();
  const { confirm } = Modal;
  const navigate = useNavigate();
  const fetchUrl =
    state.accountType === userType.PATIENT
      ? `${API_URL}/api/patient/${userID}/appointments`
      : `${API_URL}/api/doctor/${userID}/appointments`;

  const handleCancellation = async (record: Appointment) => {
    try {
      const response = await cancelAppointment(record);

      if (response.ok) {
        setTableState(Date.now());
        pushNotification('success', 'Success', 'Appointment has been cancelled');
      }
    } catch {
      pushNotification('error', 'Error', 'Something went wrong!');
      dispatch({ type: 'logout' });
      navigate(routes.logIn.path);
    }
  };

  const showConfirm = async (record: Appointment) => {
    confirm({
      title: 'Do you want to cancel this appointment?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        handleCancellation(record);
      },
    });
  };

  const columns = [
    {
      title: 'Procedure name',
      dataIndex: ['procedure', 'name'],
      key: 'name',
    },
    state.accountType === userType.PATIENT
      ? {
          title: 'Doctor',
          dataIndex: 'user',
          key: 'user',
          render: (value: any, record: Appointment) => `${record.doctor.first_name} ${record.doctor.last_name}`,
        }
      : {
          title: 'Patient',
          dataIndex: 'user',
          key: 'user',
          render: (value: any, record: Appointment) => `${record.patient.first_name} ${record.patient.last_name}`,
        },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (value: any, record: Appointment) => dayjs(record.start_time).format('MM/DD/YYYY'),
    },
    {
      title: 'Start time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (value: string) => dayjs(value).format('h:mm A'),
    },
    {
      title: 'End time',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (value: string, record: Appointment) =>
        dayjs(record.start_time).add(record.procedure.needed_time_min, 'minutes').format('h:mm A'),
    },
    {
      title: 'Cancel',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: Appointment) => (
        <DeleteButton onClick={() => showConfirm(record)}>
          <CloseOutlined />
        </DeleteButton>
      ),
    },
  ];

  return (
    <Row gutter={[0, 15]}>
      <Col span={24}>
        <PaginatedTable<Appointment>
          data={appointments}
          setData={setAppointments}
          columns={columns}
          fetchData={getAppointments(fetchUrl)}
          key={tableState}
        />
      </Col>
    </Row>
  );
};

export default AppointmentsTable;
