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
import { CenteredContainer } from 'Containers/EditProfileForm/styles';

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
  status: string;
  doctor: UserInfo;
  patient: UserInfo;
  procedure: Procedure;
}

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [render, setRender] = useState(Date.now());
  const { dispatch, state } = useContext(Store);
  const { confirm } = Modal;
  const navigate = useNavigate();
  const isPatient = state.accountType === userType.PATIENT;

  const handleCancellation = async (record: Appointment) => {
    try {
      const response = await cancelAppointment(record.id);

      if (response.ok) {
        setRender(Date.now());
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

  const timeStampRender = (value: any, record: Appointment) => {
    const startTimeObject = dayjs(record.start_time);

    const date = startTimeObject.format('DD/MM/YYYY');
    const startTime = startTimeObject.format('HH:mm');
    const endTime = startTimeObject.add(record.procedure.needed_time_min, 'minutes').format('HH:mm');

    return `${date} ${startTime} ${endTime}`;
  };

  const columns = [
    {
      title: 'Procedure',
      dataIndex: ['procedure', 'name'],
      key: 'procedure_name',
    },
    isPatient
      ? {
          title: 'Doctor',
          dataIndex: 'doctor',
          key: 'doctor',
          render: (value: any, record: Appointment) => `${record.doctor.first_name} ${record.doctor.last_name}`,
        }
      : {
          title: 'Patient',
          dataIndex: 'patient',
          key: 'patient',
          render: (value: any, record: Appointment) => `${record.patient.first_name} ${record.patient.last_name}`,
        },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: timeStampRender,
    },
    {
      title: 'Cancel',
      dataIndex: 'cancel',
      key: 'cancel',
      render: (value: any, record: Appointment) => (
        <Row>
          <Col span={24}>
            <CenteredContainer>
              <DeleteButton onClick={() => showConfirm(record)}>
                <CloseOutlined />
              </DeleteButton>
            </CenteredContainer>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <PaginatedTable<Appointment>
          data={appointments}
          setData={setAppointments}
          columns={columns}
          fetchData={getAppointments}
          key={render}
        />
      </Col>
    </Row>
  );
};

export default AppointmentsTable;
