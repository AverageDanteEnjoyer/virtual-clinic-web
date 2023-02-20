import { useState } from 'react';
import { capitalize } from 'lodash';
import dayjs from 'dayjs';

import pushNotification from 'pushNotification';
import { API_URL } from 'api';
import { getLocalStorageResource } from 'localStorageAPI';

import { WorkPlan } from 'Containers/WorkPlan/WorkPlanTable';
import { TimePickerRange } from 'Containers/WorkPlan/WorkPlanTable/styles';

import Spin from 'Components/Spin';
import { CenteredContainer } from 'Components/DeleteButton';

import { StyledForm, SubmitButton } from './styles';

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

  let workHourStart = dayjs().hour(workPlan.work_hour_start);
  let workHourEnd = dayjs().hour(workPlan.work_hour_end);

  const editWorkPlan = async (values: FormData) => {
    const body: WorkPlan = {
      id: workPlan.id,
      day_of_week: workPlan.day_of_week,
      work_hour_start: values.time_range[0].format('H'),
      work_hour_end: values.time_range[1].format('H'),
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

      if (response.ok) {
        workHourStart = dayjs().hour(responseBody.data.work_hour_start);
        workHourEnd = dayjs().hour(responseBody.data.work_hour_end);

        pushNotification('success', 'Success', 'Work plan updated successfully');
        setData(data.map((item) => (item.id === workPlan.id ? responseBody.data : item)));
        form.setFieldsValue({
          time_range: [workHourStart, workHourEnd],
        });
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
        <StyledForm.Item
          name="time_range"
          label="Work hours"
          rules={[{ required: true, message: 'Please select your work hours' }]}
          initialValue={[workHourStart, workHourEnd]}
        >
          <TimePickerRange format={'H:00'} allowClear={false} defaultValue={[workHourStart, workHourEnd]} />
        </StyledForm.Item>
        <CenteredContainer>
          <SubmitButton htmlType="submit" size="large" loading={loading}>
            Submit
          </SubmitButton>
        </CenteredContainer>
      </StyledForm>
    </Spin>
  );
};

export default EditForm;
