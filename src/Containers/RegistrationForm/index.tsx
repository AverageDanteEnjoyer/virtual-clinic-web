import { useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import Alert from '../../Components/Alert';
import Button from '../../Components/Button';
import Select from '../../Components/Select';
import Spin from '../../Components/Spin';

import routes from '../../routes';
import { API_URL } from '../../api';

export interface formItem extends FormItemProps {
  type: string;
}

type userInfo = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  account_type: string;
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >();

  const register = async (credentials: { user: userInfo }) => {
    return await fetch(`${API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  const onFinish = async (values: userInfo) => {
    const credentials = {
      user: values,
    };

    setLoading(true);
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
        description: `Please input: ${errorInfo.errorFields
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
      label: 'Password',
      name: 'password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your password' }],
    },
  ];
  const formItemsJSX = formItems.map(({ label, name, rules, type }, idx) => (
    <Form.Item key={idx} label={label} name={name} rules={rules}>
      <Input type={type} placeholder={`Enter your ${label}`} password={name === 'password'} />
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formItemsJSX}
        <Form.Item
          label="Account type"
          name="account_type"
          wrapperCol={{ offset: 0, span: 12 }}
          rules={[{ required: true, message: 'Please select your account type' }]}
        >
          <Select
            placeholder="Select your account type"
            options={[
              { value: 'patient', label: 'patient' },
              { value: 'doctor', label: 'doctor' },
            ]}
          />
        </Form.Item>
        <Row gutter={[0, 12]}>
          <Col span={4} offset={6}>
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

export default RegistrationForm;
