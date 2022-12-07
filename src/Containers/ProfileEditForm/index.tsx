import { useContext, useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import Alert from '../../Components/Alert';
import Button from '../../Components/Button';
import Spin from '../../Components/Spin';

import routes from '../../routes';
import { API_URL } from '../../api';
import { getToken } from '../../tokenApi';
import { SessionInfoContext } from '../../SessionInfoContext';

export interface formItem extends FormItemProps {
  type: string;
}

type userInfo = {
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  password: string;
};

const ProfileEditForm = () => {
  const { setIsLogged } = useContext(SessionInfoContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >();

  const update = async (credentials: { user: userInfo }) => {
    console.log(credentials);
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
    setLoading(false);

    if (response.ok) {
      setAlerts([
        {
          type: 'success',
          message: 'Success',
          description: 'Account details has been updated!',
        },
      ]);
    } else {
      const responseDetails = await response.json();
      if (response.status === 422) {
        setAlerts(
          Object.entries(responseDetails.errors).map(([key, message]) => ({
            type: 'error',
            message: 'Error',
            description: `${key} ${message}`.replaceAll('_', ' '),
          }))
        );
      } else {
        const responseError = Object(responseDetails);
        setAlerts([
          {
            type: 'error',
            message: 'Error',
            description: `${responseError.error}`,
          },
        ]);
        setTimeout(() => {
          navigate(routes.logIn);
        }, 2000);
        setIsLogged(false);
      }
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
      rules: [{ message: 'Please input your firstname' }],
    },
    {
      label: 'Last name',
      name: 'last_name',
      type: 'text',
      rules: [{ message: 'Please input your lastname' }],
    },
    { label: 'Email', name: 'email', type: 'email', rules: [{ message: 'Please input your email' }] },
    {
      label: 'Current password',
      name: 'current_password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your password' }],
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      rules: [{ message: 'Please input your password' }],
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
