import { useEffect, useState } from 'react';
import { Row, Col, Space, FormItemProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';

import Input from 'Components/Input';
import Spin from 'Components/Spin';
import Radio from 'Components/Radio';

import routes from 'routes';
import { API_URL } from 'api';
import { StyledForm, StyledButton } from './styles';
import pushNotification from 'pushNotification';

interface formItem extends FormItemProps {
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
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);
  const [form] = StyledForm.useForm();

  useEffect(() => {
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [timeoutId]);

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
    try {
      const response = await register(credentials);
      const responseBody = await response.json();

      if (response.ok) {
        pushNotification(
          'success',
          'Registration Success',
          `Your account has been created! Redirecting to the login page...`
        );

        setTimeoutId(
          setTimeout(() => {
            navigate(routes.logIn.path);
          }, 3000)
        );
      } else {
        Object.entries(responseBody.errors).forEach(([key, value]) => {
          const description = `${capitalize(key.replaceAll('_', ' '))} ${value}.`;

          formItems.forEach(({ name }) => {
            key === name && form.setFields([{ name: key, errors: [description] }]);
          });
        });
      }
    } catch (error) {
      pushNotification('error', 'Server Error', 'Please try again later', 10);
    } finally {
      setLoading(false);
    }
  };

  const formItems: formItem[] = [
    {
      label: 'First name',
      name: 'first_name',
      type: 'text',
      rules: [{ required: true, message: 'Please input your first name' }],
    },
    {
      label: 'Last name',
      name: 'last_name',
      type: 'text',
      rules: [{ required: true, message: 'Please input your last name' }],
    },
    { label: 'E-mail', name: 'email', type: 'email', rules: [{ required: true, message: 'Please input your email' }] },
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

  const formAccountType = (
    <StyledForm.Item
      label="Account type"
      name="account_type"
      initialValue="patient"
      rules={[{ required: true, message: 'Please select your account type' }]}
    >
      <Radio.Group name="account_type">
        <Space direction="vertical">
          <Radio value="patient">Patient</Radio>
          <Radio value="doctor">Doctor</Radio>
        </Space>
      </Radio.Group>
    </StyledForm.Item>
  );

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <StyledForm form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
        <Row>
          <Col span={24}>
            {formItemsJSX}
            {formAccountType}
            <StyledButton htmlType="submit" size="large" loading={loading}>
              Register
            </StyledButton>
          </Col>
        </Row>
      </StyledForm>
    </Spin>
  );
};

export default RegistrationForm;
