import { useState } from 'react';
import { Form, Space, TimePicker } from 'antd';

import Spin from '../../../Components/Spin';
import { CenteredContainer } from '../../EditProfileForm/styles';
import Button from '../../../Components/Button';
import { getLocalStorageResource } from '../../../localStorageAPI';
import { API_URL } from '../../../api';
import Alert from '../../../Components/Alert';
import { WorkPlan } from '../WorkPlanTable';

interface FormData {
  time_range: any;
}

interface EditWorkPlanProps {
  data: WorkPlan[];
  setData: (data: WorkPlan[]) => void;
  workPlan: WorkPlan;
  closeEditModal: () => void;
}

const EditForm = ({ data, setData, workPlan, closeEditModal }: EditWorkPlanProps) => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >([]);

  const editWorkPlan = async (values: FormData) => {
    const body: WorkPlan = {
      id: workPlan.id,
      day_of_week: workPlan.day_of_week,
      work_hour_start: values.time_range[0].$H.toString(),
      work_hour_end: values.time_range[1].$H.toString(),
    };

    const token = getLocalStorageResource('token');
    return await fetch(`${API_URL}/api/v1/work_plans/${workPlan.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        work_plan: body,
      }),
    });
  };

  const onFinish = async (values: FormData) => {
    setLoading(true);
    const response = await editWorkPlan(values);
    const responseBody = await response.json();
    setLoading(false);

    if (response.ok) {
      setAlerts([
        {
          type: 'success',
          message: 'Work plan has been edited successfully',
        },
      ]);
      setData(data.map((item) => (item.id === workPlan.id ? responseBody.data : item)));
      setTimeout(closeEditModal, 5000);
    } else {
      setAlerts(
        Object.entries(responseBody.errors).map(([key, message]) => ({
          type: 'error',
          message: `Day ${message}`,
        }))
      );
    }
  };

  const alertsJSX = alerts.map(({ type, message, description }, idx) => (
    <Alert key={idx} type={type} message={message} description={description} />
  ));

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <Form autoComplete="off" onFinish={onFinish}>
        <Form.Item
          name="time_range"
          label="Work hours"
          rules={[{ required: true, message: 'Please select your work hours' }]}
        >
          <TimePicker.RangePicker format={'H'} allowClear={false} />
        </Form.Item>
        <CenteredContainer>
          <Button htmlType="submit" size="large" loading={loading}>
            Submit
          </Button>
        </CenteredContainer>
        <Space direction={'horizontal'} size={'large'} style={{ marginTop: 20 }}>
          {alertsJSX}
        </Space>
      </Form>
    </Spin>
  );
};

export default EditForm;
