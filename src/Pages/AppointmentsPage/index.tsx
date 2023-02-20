import { Col, Row } from 'antd';

import { StyledTitle } from 'Components/Typography/styles';
import Navbar from 'Components/Navbar';

import AppointmentsTable from 'Containers/AppointmentsTable';

import useTitle from 'Hooks/useTitle';

import { PanelCol } from './styles';

const AppointmentsPage = () => {
  useTitle();

  return (
    <>
      <Navbar />
      <StyledTitle centered>My appointments</StyledTitle>
      <Row>
        <PanelCol xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }} xl={{ span: 12, offset: 6 }}>
          <Row>
            <Col xs={{ span: 22, offset: 1 }}>
              <StyledTitle level={2} centered>
                Appointments schedule
              </StyledTitle>
              <AppointmentsTable />
            </Col>
          </Row>
        </PanelCol>
      </Row>
    </>
  );
};

export default AppointmentsPage;
