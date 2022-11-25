import React, { useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import StyledInput from '../Components/Input';
import StyledAlert from '../Components/Alert';
import StyledButton from '../Components/Button';

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

async function register(credentials: { user: user_info }) {
  return await fetch('https://innowacja-2022.herokuapp.com/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

const RegistrationForms = () => {
  const navigate = useNavigate();

  const onFinish = async (values: user_info) => {
    const credentials = {
      user: values,
    };
    const response = await register(credentials);
    if (response.ok) {
      setAlert({ type: 'success', message: 'Account has been created! Redirecting the login page' });
      setTimeout(() => {
        navigate(routes.logIn);
      }, 3000);
    }
    if (response.status === 422) {
      setAlert({ type: 'info', message: 'Account already exists' });
    } else if (response.status === 500) {
      setAlert({ type: 'error', message: 'Internal server problem occured, please come back later' });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setAlert({
      type: 'error',
      message:
        'Please input: ' +
        errorInfo.errorFields
          .map((field: any) => field.name)
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
      <StyledInput type={item.type} placeholder={'Enter your ' + item.label} password={item.name === 'password'} />
    </Form.Item>
  ));

  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error' | 'info' | undefined; message: string }>();
  const alertComponent = alert ? <StyledAlert type={alert.type} message={alert.message} /> : undefined;

  return (
    <div>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {fItems}
        <Row>
          <Col span={6} />
          <Col span={4}>
            <StyledButton htmlType="submit">Submit</StyledButton>
          </Col>
          <Col span={8}>{alertComponent}</Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegistrationForms;
