import { Col } from 'antd';

import RegistrationForm from '../../Containers/RegistrationForm';
import Navbar from '../../Components/Navbar';
import useTitle from '../../useTitle';
import { Container, FullHeightRow, Panel, CardRow, CardTitle } from './styles';

const RegistrationPage = () => {
  useTitle();

  return (
    <Container>
      <Navbar />
      <FullHeightRow justify="center" align="middle">
        <Panel>
          <CardRow>
            <Col span={18} offset={3}>
              <CardTitle>Create an account</CardTitle>
            </Col>
            <Col span={18} offset={3}>
              <RegistrationForm />
            </Col>
          </CardRow>
        </Panel>
      </FullHeightRow>
    </Container>
  );
};

export default RegistrationPage;
