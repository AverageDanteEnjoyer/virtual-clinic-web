import { useContext, useState } from 'react';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
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

  const columns = [
    {
      title: 'Procedure name',
      dataIndex: ['procedure', 'name'],
      key: 'name',
    },
    {
      title: state.accountType === userType.PATIENT ? "Doctor's first name" : "Patient's first name",
      dataIndex: state.accountType === userType.PATIENT ? ['doctor', 'first_name'] : ['patient', 'first_name'],
      key: 'first_name',
    },
    {
      title: state.accountType === userType.PATIENT ? "Doctor's last name" : "Patient's last name",
      dataIndex: state.accountType === userType.PATIENT ? ['doctor', 'last_name'] : ['patient', 'last_name'],
      key: 'last_name',
    },
    {
      title: 'Procedure start time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (value: string) => dayjs(value).format('HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: Appointment) => (
        <DeleteButton onClick={() => handleCancellation(record)}>
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
