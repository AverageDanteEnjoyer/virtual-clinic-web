import { useContext, useEffect, useState } from 'react';
import { Col, Row, notification, FormItemProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import Spin from '../../Components/Spin';

import routes from '../../routes';
import { API_URL } from '../../api';
import { Store } from '../../store';
import { StyledButton, StyledForm } from './styles';

export interface formItem extends FormItemProps {
  type: string;
}

type loginInfo = {
  email: string;
  password: string;
};

type AlertType = 'success' | 'info' | 'warning' | 'error';

const LoginForm = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();

  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: AlertType;
      message: string;
      description?: string;
    }[]
  >(location.state ? location.state.errors : []);

  useEffect(() => {
    alerts.forEach((alert) => {
      api[alert.type]({
        message: alert.message,
        description: alert.description,
        placement: 'bottomRight',
      });
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [alerts]);

  const requestLogin = async (credentials: { user: loginInfo }) => {
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

    setLoading(true);
    try {
      const response = await requestLogin(credentials);
      const responseBody = await response.json();

      if (response.ok) {
        setAlerts([
          {
            type: 'success',
            message: 'You successfully logged in. Redirecting to home page...',
          },
        ]);

        dispatch({
          type: 'login',
          payload: {
            accountType: responseBody.account_type,
            localStorage: {
              id: responseBody.id,
              token: response.headers.get('Authorization'),
              first_name: responseBody.first_name,
              last_name: responseBody.last_name,
              email: responseBody.email,
            },
          },
        });

        setTimeoutId(
          setTimeout(() => {
            navigate(routes.home.path);
          }, 2000)
        );
      } else {
        setAlerts([
          {
            type: 'warning',
            message: responseBody.error,
          },
        ]);
      }
    } catch (error) {
      setAlerts([
        {
          type: 'error',
          message: 'Server Error',
          description: 'Please try again later',
        },
      ]);
    } finally {
      setLoading(false);
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
      label: 'E-mail',
      name: 'email',
      type: 'email',
      rules: [{ required: true, message: 'Please input your email' }],
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your password' }],
    },
  ];

  const formItemsJSX = formItems.map(({ label, name, rules, type }, idx) => (
    <StyledForm.Item key={idx} label={label} name={name} rules={rules}>
      <Input type={type} password={name === 'password'} />
    </StyledForm.Item>
  ));

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      {contextHolder}
      <StyledForm onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" requiredMark={false}>
        <Row>
          <Col span={24}>
            {formItemsJSX}
            <StyledButton htmlType="submit" size="large" loading={loading}>
              Log in
            </StyledButton>
          </Col>
        </Row>
      </StyledForm>
    </Spin>
  );
};

export default LoginForm;
