import { Row, Col } from 'antd';

import useTitle from 'Hooks/useTitle';

import ProfileEditForm from 'Containers/EditProfileForm';

import { PanelCol } from './styles';
import Navbar from 'Components/Navbar';
import { Title } from 'Components/Typography';

const ProfileEditPage = () => {
  useTitle();

  return (
    <>
      <Navbar />
      <Title centered>Profile edit</Title>
      <Row gutter={[0, 50]}>
        <PanelCol
          xs={{ span: 22, offset: 1 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 12, offset: 6 }}
          xl={{ span: 10, offset: 7 }}
        >
          <Row>
            <Col xs={{ span: 22, offset: 1 }}>
              <Title centered level={2}>
                Edit detailed information
              </Title>
              <ProfileEditForm />
            </Col>
          </Row>
        </PanelCol>
      </Row>
    </>
  );
};

export default ProfileEditPage;
