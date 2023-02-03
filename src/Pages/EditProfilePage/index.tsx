import { useContext, useRef, useState } from 'react';
import { Col, Row } from 'antd';

import ProfileEditForm from '../../Containers/EditProfileForm';
import Navbar from '../../Components/Navbar';
import WorkPlanTable from '../../Containers/WorkPlan/WorkPlanTable';
import { StyledTitle } from '../../Components/Typography/styles';
import { SessionInfoContext, userType } from '../../SessionInfoContext';
import CreateForm from '../../Containers/WorkPlan/CreateForm';
import { WorkPlan } from '../../Containers/WorkPlan/WorkPlanTable';

const ProfileEditPage = () => {
  const { accountType } = useContext(SessionInfoContext);
  const [workPlan, setWorkPlan] = useState<WorkPlan[]>([]);
  const tableRerender = useRef(true);

  return (
    <>
      <Navbar />
      <Row gutter={[0, 50]}>
        <Col span={12} offset={6}>
          <StyledTitle>Edit profile</StyledTitle>
          <ProfileEditForm />
        </Col>
        {accountType === userType.DOCTOR && (
          <Col span={12} offset={6}>
            <StyledTitle>Edit work plan</StyledTitle>
            <WorkPlanTable tableRerenderRef={tableRerender} />
            <StyledTitle level={3}>Add new one</StyledTitle>
            <CreateForm tableRerenderRef={tableRerender} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProfileEditPage;
