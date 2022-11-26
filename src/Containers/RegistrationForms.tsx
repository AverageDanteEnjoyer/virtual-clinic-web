import React, { useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../Components/Input';
import Alert from '../Components/Alert';
import Button from '../Components/Button';
import Select from '../Components/Select';
import Spin from '../Components/Spin';

import routes from '../routes';

interface formItem extends FormItemProps {
  type: string;
}

type user_info = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const RegistrationForms = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState('patient');
  const [alert, setAlert] = useState<{
    type: 'success' | 'warning' | 'error' | 'info' | undefined;
    message: string;
    description?: string;
  }>();

  const register = async (credentials: { user: user_info }) => {
    setLoading(true);
    return await fetch('https://innowacja-2022.herokuapp.com/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  const onFinish = async (values: user_info) => {
    const credentials = {
      user: { ...values, account_type: accountType },
    };

    const response = await register(credentials);
    setLoading(false);

    if (response.ok) {
      setAlert({
        type: 'success',
        message: 'Success',
        description: 'Account has been created! Redirecting to the login page',
      });
      setTimeout(() => {
        navigate(routes.logIn);
      }, 3000);
    }
    if (response.status === 422) {
      setAlert({ type: 'info', message: 'Account already exists' });
    } else if (response.status >= 500) {
      setAlert({
        type: 'error',
        message: 'Error',
        description: 'Internal server problem occured, please come back later',
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setAlert({
      type: 'error',
      message: 'Error',
      description:
        'Please input: ' +
        errorInfo.errorFields
          .map((field: any) => field.name.toString().replaceAll('_', ''))
          .toString()
          .replace(/,/g, ', '),
    });
  };

  const items: formItem[] = [
    {
      label: 'firstname',
      name: 'first_name',
      type: 'text',
      rules: [{ required: true, message: 'Please input your firstname' }],
    },
    {
      label: 'lastname',
      name: 'last_name',
      type: 'text',
      rules: [{ required: true, message: 'Please input your lastname' }],
    },
    { label: 'email', name: 'email', type: 'email', rules: [{ required: true, message: 'Please input your email' }] },
    {
      label: 'password',
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

  const alertComponent = alert ? (
    <Alert type={alert.type} message={alert.message} description={alert.description} />
  ) : undefined;

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
        <Row gutter={[0, 12]}>
          <Col span={6} offset={6}>
            <Select
              defaultValue="patient"
              onChange={(value) => setAccountType(value)}
              options={[
                { value: 'patient', label: 'patient' },
                { value: 'doctor', label: 'doctor' },
              ]}
            ></Select>
          </Col>
          <Col span={4}>
            <Button htmlType="submit" size="large">
              Submit
            </Button>
          </Col>
          <Col span={12} offset={6}>
            {alertComponent}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default RegistrationForms;
