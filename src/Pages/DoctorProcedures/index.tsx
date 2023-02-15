import { Col, Row } from 'antd';

import DoctorManageProcedures from 'Containers/DoctorManageProcedures';
import Navbar from 'Components/Navbar';
import { StyledTitle } from 'Components/Typography/styles';

const DoctorProcedures = () => {
  return (
    <>
      <Navbar />
      <StyledTitle center>Doctor procedures</StyledTitle>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} xl={{ span: 10, offset: 7 }}>
          <DoctorManageProcedures />
        </Col>
      </Row>
    </>
  );
};

export default DoctorProcedures;
