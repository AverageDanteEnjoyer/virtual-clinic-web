import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../../Containers/LoginForm';
import Navbar from '../../Components/Navbar';
import routes from '../../routes';
import useTitle from '../../useTitle';
import { Container, FullHeightRow, Panel, CardRow, CardTitle, EndCol, StyledButton, Note } from './styles';

const LoginPage = () => {
  useTitle();
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar />
      <FullHeightRow gutter={{ lg: 25 }} justify="center" align="middle">
        <Panel>
          <CardRow justify="space-between">
            <Col span={18} offset={3}>
              <CardTitle>I already have an account</CardTitle>
            </Col>
            <Col span={18} offset={3}>
              <LoginForm />
            </Col>
          </CardRow>
        </Panel>
        <Panel>
          <CardRow justify="space-between">
            <Col span={18} offset={3}>
              <CardTitle>I am a new user</CardTitle>
            </Col>
            <Col span={18} offset={3}>
              <Note>
                If you don’t have an account on our website yet, register to have a medical consultation, receive a
                prescription and order a drug.
              </Note>
            </Col>
            <EndCol span={18} offset={3}>
              <StyledButton size="large" onClick={() => navigate(routes.register.path)}>
                Register
              </StyledButton>
            </EndCol>
          </CardRow>
        </Panel>
      </FullHeightRow>
    </Container>
  );
};

export default LoginPage;
