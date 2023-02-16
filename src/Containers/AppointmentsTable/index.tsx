import { useState } from 'react';
import { Col, Row } from 'antd';

import PaginatedTable from 'Components/PaginatedTable';
import getAppointments from 'Containers/AppointmentsTable/fetchAppointments';
import useType from 'Hooks/useType';

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
  const { columns, fetch_url } = useType();

  return (
    <Row gutter={[0, 15]}>
      <Col span={24}>
        <PaginatedTable<Appointment>
          data={appointments}
          setData={setAppointments}
          columns={columns}
          fetchData={getAppointments(fetch_url)}
        />
      </Col>
    </Row>
  );
};

export default AppointmentsTable;
