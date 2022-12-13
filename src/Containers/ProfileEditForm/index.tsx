import { useContext, useState } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import Alert from '../../Components/Alert';
import Button from '../../Components/Button';
import Spin from '../../Components/Spin';

import routes from '../../routes';
import { API_URL } from '../../api';
import { clearLocalStorage, getLocalStorageResource, setLocalStorageResources } from '../../localStorageAPI';
import { SessionInfoContext, userType } from '../../SessionInfoContext';

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
  const { setAccountType } = useContext(SessionInfoContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >([]);

  const update = async (credentials: { user: userInfo }) => {
    const token = getLocalStorageResource('token');
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
      const updatedInfo = {
        firstName: values.first_name || getLocalStorageResource('firstName'),
        lastName: values.last_name || getLocalStorageResource('lastName'),
        email: values.email || getLocalStorageResource('email'),
      };
      setLocalStorageResources(updatedInfo);

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
        setAlerts([
          {
            type: 'error',
            message: 'Error',
            description: `${responseDetails.error}`,
          },
        ]);
        //Token is either expired or doesn't exist somehow
        if (response.status === 401) {
          setTimeout(() => {
            setAccountType(userType.GUEST);
            clearLocalStorage();
            navigate(routes.logIn);
          }, 2000);
        }
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
      label: 'First name',
      name: 'firstName',
      type: 'text',
      rules: [{ message: 'Please input your first name' }],
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      rules: [{ message: 'Please input your last name' }],
    },
    { label: 'Email', name: 'email', type: 'email', rules: [{ message: 'Please input your email' }] },
    {
      label: 'Current password',
      name: 'currentPassword',
      type: 'password',
      rules: [{ required: true, message: 'Please input your current password' }],
    },
    {
      label: 'New password',
      name: 'password',
      type: 'password',
      rules: [{ message: 'Please input your new password' }],
    },
  ];

  const formItemsJSX = formItems.map(({ label, name, rules, type }, idx) => (
    <Form.Item key={idx} label={label} name={name} rules={rules}>
      <Input
        type={type}
        placeholder={`Enter your ${label}`}
        password={type === 'password'}
        defaultValue={name && getLocalStorageResource(name.toString())}
      />
    </Form.Item>
  ));

  const alertsJSX = alerts.map(({ type, message, description }, idx) => (
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
