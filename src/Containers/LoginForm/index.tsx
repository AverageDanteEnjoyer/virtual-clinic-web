import { useContext, useEffect, useState } from 'react';
import { Col, Row, FormItemProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import Spin from '../../Components/Spin';

import routes from '../../routes';
import { API_URL } from '../../api';
import { Store } from '../../store';
import { StyledButton, StyledForm } from './styles';
import pushNotification from '../../pushNotification';

interface formItem extends FormItemProps {
  type: string;
}

type loginInfo = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [timeoutId]);

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
      const { id, email, first_name, last_name, account_type, error } = await response.json();

      if (response.ok) {
        const description = `Welcome back, ${first_name} ${last_name}! Redirecting to home page...`;
        pushNotification('success', 'Login Success', description);

        dispatch({
          type: 'login',
          payload: {
            accountType: account_type,
            localStorage: {
              id,
              token: response.headers.get('Authorization'),
              first_name,
              last_name,
              email,
            },
          },
        });

        setTimeoutId(
          setTimeout(() => {
            navigate(routes.home.path);
          }, 3000)
        );
      } else {
        pushNotification('warning', 'Login Failed', error, 10);
      }
    } catch (error) {
      pushNotification('error', 'Server Error', 'Please try again later', 10);
    } finally {
      setLoading(false);
    }
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
      <Input type={type} placeholder={`Enter your ${label}`} password={name === 'password'} />
    </StyledForm.Item>
  ));

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <StyledForm onFinish={onFinish} layout="vertical" requiredMark={false}>
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
