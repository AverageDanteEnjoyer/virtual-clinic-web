import { useContext, useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import Alert from '../../Components/Alert';
import Button from '../../Components/Button';
import Spin from '../../Components/Spin';

import routes from '../../routes';
import { setToken } from '../../tokenApi';
import { API_URL } from '../../api';
import { SessionInfoContext } from '../../SessionInfoContext';

export interface formItem extends FormItemProps {
  type: string;
}

type loginInfo = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useContext(SessionInfoContext);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >();

  const requestLogin = async (credentials: { user: loginInfo }) => {
    setLoading(true);
    return await fetch(`${API_URL}/users/sign_in/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  const onFinish = async (values: loginInfo) => {
    const credentials = {
      user: values,
    };

    const response = await requestLogin(credentials);
    const responseDetails = await response.json();
    setLoading(false);

    if (response.ok) {
      setToken(response.headers.get('Authorization'));

      setIsLogged(true);
      setAlerts([
        {
          type: 'success',
          message: 'Success',
        },
      ]);
      setTimeout(() => {
        navigate(routes.home);
      }, 2000);
    } else {
      setAlerts([
        {
          type: 'info',
          message: responseDetails.error,
        },
      ]);
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
        autoComplete="false"
      >
        {formItemsJSX}
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

export default LoginForm;
