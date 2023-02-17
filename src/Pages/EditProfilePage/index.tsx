import { Col, Row } from 'antd';
import { useContext, useState } from 'react';

import { Store, userType } from 'store';

import useTitle from 'Hooks/useTitle';

import CreateForm from 'Containers/WorkPlan/CreateForm';
import ProfileEditForm from 'Containers/EditProfileForm';
import WorkPlanTable, { WorkPlan } from 'Containers/WorkPlan/WorkPlanTable';

import Navbar from 'Components/Navbar';
import { Title } from 'Components/Typography';

const ProfileEditPage = () => {
  useTitle();

  const { state } = useContext(Store);
  const [workPlan, setWorkPlan] = useState<WorkPlan[]>([]);

  return (
    <>
      <Navbar />
      <Row gutter={[0, 50]}>
        <Col span={12} offset={6}>
          <Title centered>Profile edit</Title>
          <ProfileEditForm />
        </Col>
        {state.accountType === userType.DOCTOR && (
          <Col span={12} offset={6}>
            <Title centered>Edit work plan</Title>
            <WorkPlanTable data={workPlan} setData={setWorkPlan} />
            <Title level={3} centered>
              Add new one
            </Title>
            <CreateForm data={workPlan} setData={setWorkPlan} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProfileEditPage;
