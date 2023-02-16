import { Col, Row } from 'antd';

import { StyledTitle } from 'Components/Typography/styles';
import Navbar from 'Components/Navbar';
import AppointmentsTable from 'Containers/AppointmentsTable';

const AppointmentsPage = () => {
  return (
    <>
      <Navbar />
      <StyledTitle center>My appointments</StyledTitle>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} xl={{ span: 10, offset: 7 }}>
          <AppointmentsTable />
        </Col>
      </Row>
    </>
  );
};

export default AppointmentsPage;
