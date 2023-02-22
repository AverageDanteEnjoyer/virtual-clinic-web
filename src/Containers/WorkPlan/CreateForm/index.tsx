import { Row, Col } from 'antd';
import { useState } from 'react';
import { capitalize } from 'lodash';

import { API_URL } from 'api';
import pushNotification from 'pushNotification';
import { getLocalStorageResource } from 'localStorageAPI';

import { WorkPlan } from 'Containers/WorkPlan/WorkPlanTable';
import { TimePickerRange } from 'Containers/WorkPlan/WorkPlanTable/styles';

import Spin from 'Components/Spin';
import Select from 'Components/Select';

import { StyledForm, SubmitButton } from './styles';

interface FormData {
  day_of_week: string;
  time_range: any;
}

interface CreateFormProps {
  data: WorkPlan[];
  setData: (data: WorkPlan[]) => void;
}

const selectOptions = [
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
];

const CreateForm = ({ data, setData }: CreateFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = StyledForm.useForm();

  const createWorkPlan = async (values: FormData) => {
    const token = getLocalStorageResource('token');
    if (!token) return Promise.reject(new Error('No token found'));

    const workPlan: WorkPlan = {
      id: 0,
      day_of_week: values.day_of_week,
      work_hour_start: values.time_range[0].format('H'),
      work_hour_end: values.time_range[1].format('H'),
    };

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

    try {
      const response = await createWorkPlan(values);
      const responseBody = await response.json();

      if (response.ok) {
        pushNotification('success', 'Success', `Work plan for ${values.day_of_week} has been created successfully`);
        setData([...data, responseBody.data as WorkPlan]);
        form.resetFields();
      } else {
        Object.entries(responseBody.errors).forEach(([key, value]) => {
          const description = `${capitalize(key.replaceAll('_', ' '))} ${value}.`;

          form.setFields([{ name: key, errors: [description] }]);
        });
      }
    } catch {
      pushNotification('error', 'Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <StyledForm
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        colon={false}
      >
        <Row>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }}>
            <StyledForm.Item
              name="day_of_week"
              label="Day of week"
              rules={[{ required: true, message: 'Please input day of week' }]}
            >
              <Select placeholder="Select day of week" customOptions={selectOptions} optionLabelProp="children" />
            </StyledForm.Item>
            <StyledForm.Item
              name="time_range"
              label="Work hours"
              rules={[{ required: true, message: 'Please select your work hours' }]}
            >
              <TimePickerRange format="h A" allowClear={false} />
            </StyledForm.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
            <SubmitButton htmlType="submit" size="large" loading={loading}>
              Submit
            </SubmitButton>
          </Col>
        </Row>
      </StyledForm>
    </Spin>
  );
};

export default CreateForm;
