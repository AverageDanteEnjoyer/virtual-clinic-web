import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';

import routes from 'routes';

import useTitle from 'Hooks/useTitle';

import RegistrationForm from 'Containers/RegistrationForm';

import Navbar from 'Components/Navbar';
import Button from 'Components/Button';

import { FullHeightRow, Panel, CardRow, CardTitle, Note, Divider } from './styles';

const RegistrationPage = () => {
  useTitle();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <FullHeightRow justify="center" align="middle">
        <Panel>
          <CardRow>
            <Col span={18} offset={3}>
              <CardTitle>Create an account</CardTitle>
            </Col>
            <Divider size="large" direction="vertical">
              <Col span={18} offset={3}>
                <RegistrationForm />
              </Col>
              <Col span={18} offset={3}>
                <Note>
                  Already have an account?
                  <Button type="link" onClick={() => navigate(routes.logIn.path)}>
                    Login
                  </Button>
                </Note>
              </Col>
            </Divider>
          </CardRow>
        </Panel>
      </FullHeightRow>
    </>
  );
};

export default RegistrationPage;
