import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useContext } from 'react';
import { Row, Col } from 'antd';

import { Store, userType } from 'store';

import useTitle from 'Hooks/useTitle';

import Navbar from 'Components/Navbar';
import Carousel from 'Components/Carousel';
import { StyledTitle } from 'Components/Typography/styles';
import { Paragraph, Title } from 'Components/Typography';

import { CenteredContainer, PanelCol, StyledButton } from './styles';

const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const guestButton = state.accountType === userType.GUEST && (
    <Col xs={{ span: 21 }} lg={{ span: 16, offset: 4 }}>
      <CenteredContainer>
        <StyledButton onClick={() => navigate(routes.register.path)} size="large">
          Register now
        </StyledButton>
      </CenteredContainer>
    </Col>
  );
  const patientButton = state.accountType === userType.PATIENT && (
    <Col xs={{ span: 21 }} lg={{ span: 16, offset: 4 }}>
      <CenteredContainer>
        <StyledButton onClick={() => navigate(routes.makeAppointment.path)} size="large">
          Make an appointment
        </StyledButton>
      </CenteredContainer>
    </Col>
  );
  useTitle();

  return (
    <>
      <Navbar />
      <Row>
        <Col xs={{ span: 16, offset: 1 }} lg={{ span: 12, offset: 2 }}>
          <StyledTitle centered={false}>Virtual Clinic</StyledTitle>
        </Col>
      </Row>
      <Row>
        <PanelCol xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
          <Row>
            <Col xs={{ span: 21 }} lg={{ span: 12 }}>
              <Carousel />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Row>
                <Col xs={{ span: 21 }} lg={{ span: 16, offset: 4 }}>
                  <Title level={2}>Receive Virtual Medical Care</Title>
                  <Paragraph>
                    Welcome to our online clinic, where you can receive high-quality medical care from the comfort of
                    your own home. Our experienced team of healthcare professionals is dedicated to providing
                    personalized and convenient virtual consultations for a wide range of medical concerns. With our
                    easy-to-use platform, you can book appointments, chat with doctors, and access your medical records
                    all in one place. Trust us to provide the care and support you need to achieve optimal health and
                    wellness.
                  </Paragraph>
                </Col>
                {guestButton}
                {patientButton}
              </Row>
            </Col>
          </Row>
        </PanelCol>
      </Row>
    </>
  );
};

export default HomePage;
