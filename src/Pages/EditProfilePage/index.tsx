import { useContext, useState } from 'react';
import { Col, Row } from 'antd';

import ProfileEditForm from '../../Containers/EditProfileForm';
import Navbar from '../../Components/Navbar';
import WorkPlanTable from '../../Containers/WorkPlan/WorkPlanTable';
import { StyledTitle } from '../../Components/Typography/styles';
import CreateForm from '../../Containers/WorkPlan/CreateForm';
import { WorkPlan } from '../../Containers/WorkPlan/WorkPlanTable';
import { Store, userType } from '../../store';
import useTitle from '../../useTitle';

const ProfileEditPage = () => {
  useTitle();

  const { state } = useContext(Store);
  const [workPlan, setWorkPlan] = useState<WorkPlan[]>([]);

  return (
    <>
      <Navbar />
      <Row gutter={[0, 50]}>
        <Col span={12} offset={6}>
          <StyledTitle center="true">Profile edit</StyledTitle>
          <ProfileEditForm />
        </Col>
        {state.accountType === userType.DOCTOR && (
          <Col span={12} offset={6}>
            <StyledTitle center="true">Edit work plan</StyledTitle>
            <WorkPlanTable data={workPlan} setData={setWorkPlan} />
            <StyledTitle level={3} center="true">Add new one</StyledTitle>
            <CreateForm data={workPlan} setData={setWorkPlan} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProfileEditPage;
