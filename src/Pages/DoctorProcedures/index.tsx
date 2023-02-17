import { Col, Row } from 'antd';

import DoctorManageProcedures from 'Containers/DoctorManageProcedures';
import Navbar from 'Components/Navbar';
import { Title } from 'Components/Typography';

const DoctorProcedures = () => {
  return (
    <>
      <Navbar />
      <Title centered>Doctor procedures</Title>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} xl={{ span: 10, offset: 7 }}>
          <DoctorManageProcedures />
        </Col>
      </Row>
    </>
  );
};

export default DoctorProcedures;
