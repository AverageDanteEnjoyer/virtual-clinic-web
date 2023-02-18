import { useState } from 'react';
import { Col, Row } from 'antd';

import { Title } from 'Components/Typography';
import WorkPlanTable, { WorkPlan } from 'Containers/WorkPlan/WorkPlanTable';
import CreateForm from 'Containers/WorkPlan/CreateForm';
import Navbar from 'Components/Navbar';
import useTitle from 'Hooks/useTitle';

import { PanelCol } from './styles';

const WorkPlanPage = () => {
  useTitle();
  const [workPlan, setWorkPlan] = useState<WorkPlan[]>([]);

  return (
    <>
      <Navbar />
      <Title centered>Work plan</Title>
      <Row>
        <PanelCol
          xs={{ span: 22, offset: 1 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 12, offset: 6 }}
          xl={{ span: 10, offset: 7 }}
        >
          <Row>
            <Col xs={{ span: 22, offset: 1 }}>
              <Title centered level={2}>
                Work plan schedule
              </Title>
              <WorkPlanTable data={workPlan} setData={setWorkPlan} />
              {workPlan?.length < 7 && (
                <>
                  <Title centered level={2}>
                    Add new workday
                  </Title>
                  <CreateForm data={workPlan} setData={setWorkPlan} />
                </>
              )}
            </Col>
          </Row>
        </PanelCol>
      </Row>
    </>
  );
};

export default WorkPlanPage;
