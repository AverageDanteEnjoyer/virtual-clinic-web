import { useContext, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

import pushNotification from 'pushNotification';
import routes from 'routes';
import palette from 'palette';
import { Store, userType } from 'store';

import PaginatedTable from 'Components/PaginatedTable';
import { DeleteButton, CenteredContainer } from 'Components/DeleteButton';

import getAppointments from 'Containers/AppointmentsTable/fetchAppointments';
import cancelAppointment from 'Containers/AppointmentsTable/cancelAppointment';

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
      icon: <ExclamationCircleTwoTone twoToneColor={[palette.white, palette.ultraViolet]} />,
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        color: palette.ultraViolet,
      },
      onOk() {
        handleCancellation(record);
      },
    });
  };

  const timeStampRender = (value: any, record: Appointment) => {
    const startTimeObject = dayjs(record.start_time);

    const date = startTimeObject.format('MM/DD/YYYY');
    const startTime = startTimeObject.format('h:mm A');
    const endTime = startTimeObject.add(record.procedure.needed_time_min, 'minutes').format('h:mm A');

    return `${date} ${startTime} - ${endTime}`;
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Cancel',
      dataIndex: 'cancel',
      key: 'cancel',
      width: 1,
      render: (value: any, record: Appointment) => (
        <Row>
          <Col span={24}>
            <CenteredContainer>
              <DeleteButton onClick={() => showConfirm(record)} disabled={record.status !== 'pending'}>
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
          locale={{
            emptyText: `You have no appointments so far`,
          }}
        />
      </Col>
    </Row>
  );
};

export default AppointmentsTable;
