import { useState } from 'react';
import { capitalize } from 'lodash';
import { Col, Row } from 'antd';

import pushNotification from 'pushNotification';
import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';
import { WorkPlan } from 'Containers/WorkPlan/WorkPlanTable';
import Spin from 'Components/Spin';

import { StyledForm, SubmitButton } from './styles';
import { TimePickerRange } from 'Containers/WorkPlan/WorkPlanTable/styles';

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
  const [form] = StyledForm.useForm();

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

    try {
      const response = await editWorkPlan(values);
      const responseBody = await response.json();
      setLoading(false);

      if (response.ok) {
        pushNotification('success', 'Success', 'Work plan updated successfully');
        setData(data.map((item) => (item.id === workPlan.id ? responseBody.data : item)));
        form.resetFields();
        setTimeout(closeEditModal, 5000);
      } else {
        const formItem = form.getFieldInstance('time_range');
        const description = `${capitalize(formItem.name.replaceAll('_', ' '))} ${responseBody.errors[formItem.name]}.`;
        form.setFields([{ name: formItem.name, errors: [description] }]);
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
        autoComplete="off"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        colon={false}
      >
        <Row>
          <Col span={24}>
            <StyledForm.Item
              name="time_range"
              label="Work hours"
              rules={[{ required: true, message: 'Please select your work hours' }]}
            >
              <TimePickerRange format={'H'} allowClear={false} />
            </StyledForm.Item>
          </Col>
          <Col span={24}>
            <SubmitButton htmlType="submit" size="large" loading={loading}>
              Submit
            </SubmitButton>
          </Col>
        </Row>
      </StyledForm>
    </Spin>
  );
};

export default EditForm;
