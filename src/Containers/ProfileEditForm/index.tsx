import { useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';

import Input from '../../Components/Input';
import Alert from '../../Components/Alert';
import Button from '../../Components/Button';
import Select from '../../Components/Select';
import Spin from '../../Components/Spin';

import { API_URL } from '../../api';
import { getToken } from '../../tokenApi';

export interface formItem extends FormItemProps {
  type: string;
}

type userInfo = {
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  password: string;
  professions: string[];
};

const ProfileEditForm = () => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >();

  const update = async (credentials: { user: userInfo }) => {
    const token = getToken();
    return await fetch(`${API_URL}/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(credentials),
    });
  };

  const onFinish = async (values: userInfo) => {
    const credentials = {
      user: values,
    };

    setLoading(true);
    const response = await update(credentials);
    const responseDetails = await response.json();
    setLoading(false);

    if (response.ok) {
      setAlerts([
        {
          type: 'success',
          message: 'Success',
          description: 'Account details has been updated! Redirecting to the login page',
        },
      ]);
    } else {
      setAlerts(
        Object.entries(responseDetails.errors).map(([key, message]) => ({
          type: 'info',
          message: `${key} ${message}`,
        }))
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setAlerts([
      {
        type: 'error',
        message: 'Error',
        description: `Please input:' ${errorInfo.errorFields
          .map((field: any) => field.name.toString().replaceAll('_', ' '))
          .join(', ')}`,
      },
    ]);
  };

  const formItems: formItem[] = [
    {
      label: 'Name',
      name: 'first_name',
      type: 'text',
      rules: [{ required: true, message: 'Please input your firstname' }],
    },
    {
      label: 'Last name',
      name: 'last_name',
      type: 'text',
      rules: [{ required: true, message: 'Please input your lastname' }],
    },
    { label: 'Email', name: 'email', type: 'email', rules: [{ required: true, message: 'Please input your email' }] },
    {
      label: 'Current password',
      name: 'current_password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your password' }],
    },
    {
      label: 'New password',
      name: 'new_password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your password' }],
    },
  ];

  const formItemsJSX = formItems.map(({ label, name, rules, type }, idx) => (
    <Form.Item key={idx} label={label} name={name} rules={rules}>
      <Input type={type} placeholder={`Enter your ${label}`} password={type === 'password'} />
    </Form.Item>
  ));

  const alertsJSX = alerts?.map(({ type, message, description }, idx) => (
    <Alert key={idx} closable={false} type={type} message={message} description={description} />
  ));

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {formItemsJSX}
        <Form.Item
          label="Professions"
          name="professions"
          wrapperCol={{ offset: 0, span: 12 }}
          rules={[{ required: true, message: 'Please select your professions' }]}
        >
          <Select
            placeholder="Select professions"
            options={[
              { value: 'patient', label: 'patient' },
              { value: 'doctor', label: 'doctor' },
            ]}
          />
        </Form.Item>
        <Row gutter={[0, 12]}>
          <Col span={12} offset={6}>
            <Button shape="round" htmlType="submit" size="large" loading={loading}>
              Submit
            </Button>
          </Col>
          <Col span={12} offset={6}>
            {alertsJSX}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default ProfileEditForm;
