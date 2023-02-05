import { useState } from 'react';
import Spin from '../../../Components/Spin';
import { Col, Form, TimePicker } from 'antd';
import Select from '../../../Components/Select';
import { CenteredContainer } from '../../EditProfileForm/styles';
import Button from '../../../Components/Button';

const EditForm = () => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >([]);

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <Form autoComplete="off">
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
          {/*{alertsJSX}*/}
        </Col>
      </Form>
    </Spin>
  );
};

export default EditForm;
