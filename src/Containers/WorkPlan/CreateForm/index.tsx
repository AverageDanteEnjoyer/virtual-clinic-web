import { useState } from 'react';
import { Col, Form, TimePicker } from 'antd';

import Spin from '../../../Components/Spin';
import Button from '../../../Components/Button';
import { CenteredContainer } from '../../EditProfileForm/styles';
import Select from '../../../Components/Select';
import { getLocalStorageResource } from '../../../localStorageAPI';
import { API_URL } from '../../../api';
import Alert from '../../../Components/Alert';
import { WorkPlan } from '../WorkPlanTable';

interface FormData {
  day_of_week: string;
  time_range: any;
}

interface CreateFormProps {
  data: WorkPlan[];
  setData: (data: WorkPlan[]) => void;
}

const CreateForm = ({ data, setData }: CreateFormProps) => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >([]);

  const setWorkPlan = async (values: FormData) => {
    const workPlan: WorkPlan = {
      id: 0,
      day_of_week: values.day_of_week,
      work_hour_start: values.time_range[0].$H.toString(),
      work_hour_end: values.time_range[1].$H.toString(),
    };

    const token = getLocalStorageResource('token');
    return await fetch(`${API_URL}/api/v1/work_plans/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        work_plan: workPlan,
      }),
    });
  };

  const onFinish = async (values: FormData) => {
    setLoading(true);
    const response = await setWorkPlan(values);
    const responseBody = await response.json();
    setLoading(false);

    if (response.ok) {
      setAlerts([
        {
          type: 'success',
          message: 'Work plan for ' + values.day_of_week + ' has been created successfully',
        },
      ]);
      setData([...data, responseBody.data as WorkPlan]);
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
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="day_of_week"
          label="Day of week"
          rules={[{ required: true, message: 'Please input day of week' }]}
        >
          <Select
            placeholder="Select day of week"
            customOptions={[
              {
                label: 'Working days',
                children: [
                  { label: 'Monday', value: 'monday' },
                  { label: 'Tuesday', value: 'tuesday' },
                  { label: 'Wednesday', value: 'wednesday' },
                  { label: 'Thursday', value: 'thursday' },
                  { label: 'Friday', value: 'friday' },
                ],
              },
              {
                label: 'Weekends',
                children: [
                  { label: 'Saturday', value: 'saturday' },
                  { label: 'Sunday', value: 'sunday' },
                ],
              },
            ]}
          />
        </Form.Item>
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
        <Col span={12} offset={6}>
          {alertsJSX}
        </Col>
      </Form>
    </Spin>
  );
};

export default CreateForm;