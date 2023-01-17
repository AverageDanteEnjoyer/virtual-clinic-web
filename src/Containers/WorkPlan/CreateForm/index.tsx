import { useState } from 'react';
import { Form, TimePicker } from 'antd';

import Spin from '../../../Components/Spin';
import Button from '../../../Components/Button';
import { CenteredContainer } from '../../EditProfileForm/styles';
import Select from '../../../Components/Select';

interface FormData {
  day_of_week: string;
  time: any;
}

const CreateForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormData) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="day_of_week"
          label="Day of week"
          rules={[{ required: true, message: 'Please input day of week' }]}
        >
          <Select
            mode={undefined}
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
          ></Select>
        </Form.Item>
        <Form.Item name="time_range" label="Work hours" rules={[{ required: true, message: 'Please select your w' }]}>
          <TimePicker.RangePicker format={'H'} allowClear={false}></TimePicker.RangePicker>
        </Form.Item>

        <CenteredContainer>
          <Button htmlType="submit" size="large" loading={loading}>
            Submit
          </Button>
        </CenteredContainer>
      </Form>
    </Spin>
  );
};

export default CreateForm;
