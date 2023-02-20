import { Col, Row } from 'antd';

import DoctorManageProcedures from 'Containers/DoctorManageProcedures';

import Navbar from 'Components/Navbar';
import { Title } from 'Components/Typography';

import useTitle from 'Hooks/useTitle';

import { PanelCol } from './styles';

const DoctorProcedures = () => {
  useTitle();

  return (
    <>
      <Navbar />
      <Title centered>Manage procedures</Title>
      <Row>
        <PanelCol
          xs={{ span: 22, offset: 1 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 12, offset: 6 }}
          xl={{ span: 10, offset: 7 }}
        >
          <Row>
            <Col xs={{ span: 22, offset: 1 }}>
              <Title centered level={2}>
                My procedures
              </Title>
              <DoctorManageProcedures />
            </Col>
          </Row>
        </PanelCol>
      </Row>
    </>
  );
};

export default DoctorProcedures;
