import React, { useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../Components/Input';
import Alert from '../Components/Alert';
import Button from '../Components/Button';
import Select from '../Components/Select';
import Spin from '../Components/Spin';

import routes from '../routes';
import { API_URL } from '../api';

interface formItem extends FormItemProps {
  type: string;
}

type user_info = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  account_type: string;
};

const RegistrationForms = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info' | undefined;
      message: string;
      description?: string;
    }[]
  >();

  const register = async (credentials: { user: user_info }) => {
    setLoading(true);
    return await fetch(`${API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  const onFinish = async (values: user_info) => {
    const credentials = {
      user: values,
    };

    const response = await register(credentials);
    const responseDetails = await response.json();

    setLoading(false);

    if (response.ok) {
      setAlerts([
        {
          type: 'success',
          message: 'Success',
          description: 'Account has been created! Redirecting to the login page',
        },
      ]);
      setTimeout(() => {
        navigate(routes.logIn);
      }, 3000);
    } else {
      setAlerts(
        Object.entries(responseDetails.errors).map((error) => ({
          type: 'info',
          message: error.join(': '),
        }))
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setAlerts([
      {
        type: 'error',
        message: 'Error',
        description:
          'Please input: ' +
          errorInfo.errorFields.map((field: any) => field.name.toString().replaceAll('_', '')).join(', '),
      },
    ]);
  };

  const items: formItem[] = [
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
      label: 'Password',
      name: 'password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your password' }],
    },
  ];
  const fItems = items.map((item, idx) => (
    <Form.Item key={idx} label={item.label} name={item.name} rules={item.rules}>
      <Input type={item.type} placeholder={'Enter your ' + item.label} password={item.name === 'password'} />
    </Form.Item>
  ));

  const alertsComponent = alerts?.map((alert, key) => (
    <Alert key={key} closable={false} type={alert.type} message={alert.message} description={alert.description} />
  ));

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="false"
      >
        {fItems}
        <Form.Item label="Account type" name="account_type" initialValue="patient" wrapperCol={{ offset: 0, span: 12 }}>
          <Select
            defaultValue="patient"
            options={[
              { value: 'patient', label: 'patient' },
              { value: 'doctor', label: 'doctor' },
            ]}
          />
        </Form.Item>
        <Row gutter={[0, 12]}>
          <Col span={4} offset={6}>
            <Button htmlType="submit" size="large" loading={loading}>
              Submit
            </Button>
          </Col>
          <Col span={12} offset={6}>
            {alertsComponent}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default RegistrationForms;
