import { Row, Col } from 'antd';
import { useContext, useState } from 'react';

import { Store, userType } from 'store';

import useTitle from 'Hooks/useTitle';

import CreateForm from 'Containers/WorkPlan/CreateForm';
import ProfileEditForm from 'Containers/EditProfileForm';
import WorkPlanTable, { WorkPlan } from 'Containers/WorkPlan/WorkPlanTable';

import { PanelCol } from './styles';
import Navbar from 'Components/Navbar';
import { Title } from 'Components/Typography';

const ProfileEditPage = () => {
  useTitle();

  const { state } = useContext(Store);
  const [workPlan, setWorkPlan] = useState<WorkPlan[]>([]);

  const editDetailedInfo = (
    <>
      <Title centered level={2}>
        Edit detailed information
      </Title>
      <ProfileEditForm />
    </>
  );

  const editWorkPlan = state.accountType === userType.DOCTOR && (
    <>
      <Title centered level={2}>
        Edit Work Plan
      </Title>
      <WorkPlanTable data={workPlan} setData={setWorkPlan} />

      {workPlan?.length < 7 && (
        <>
          <Title centered level={2}>
            Add new Work Plan
          </Title>
          <CreateForm data={workPlan} setData={setWorkPlan} />
        </>
      )}
    </>
  );

  const sections = [editDetailedInfo, editWorkPlan].filter(Boolean);

  return (
    <>
      <Navbar />
      <Title centered>Profile edit</Title>
      <Row gutter={[0, 50]}>
        {sections.map((section, idx) => (
          <PanelCol
            xs={{ span: 22, offset: 1 }}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
            xl={{ span: 10, offset: 7 }}
            key={idx}
          >
            <Row>
              <Col xs={{ span: 22, offset: 1 }}>{section}</Col>
            </Row>
          </PanelCol>
        ))}
      </Row>
    </>
  );
};

export default ProfileEditPage;
