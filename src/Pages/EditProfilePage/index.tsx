import { useContext } from 'react';

import ProfileEditForm from '../../Containers/EditProfileForm';
import Navbar from '../../Components/Navbar';
import ScheduleAddForm from '../../Containers/DoctorsSecheduleForm';
import { StyledTitle } from '../../Components/Typography/styles';
import { SessionInfoContext, userType } from '../../SessionInfoContext';
import { Col, Row } from 'antd';

const ProfileEditPage = () => {
  const { accountType } = useContext(SessionInfoContext);

  return (
    <>
      <Navbar />
      <StyledTitle>Edit profile</StyledTitle>
      <Row>
        <Col span={12} offset={6}>
          <ProfileEditForm />
        </Col>
      </Row>
      {accountType === userType.DOCTOR && (
        <Row>
          <Col span={12} offset={6}>
            <StyledTitle>Edit work plan</StyledTitle>
            <ScheduleAddForm />
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileEditPage;
