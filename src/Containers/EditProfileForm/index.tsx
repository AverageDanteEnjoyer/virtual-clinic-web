import { capitalize } from 'lodash';
import {Row, Col, FormItemProps, Avatar, Upload} from 'antd';
import { useContext, useState, ReactNode } from 'react';
import { PlusOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import { Store, userType } from 'store';
import pushNotification from 'pushNotification';
import { getLocalStorageResource, setLocalStorageResources } from 'localStorageAPI';

import Spin from 'Components/Spin';
import Input from 'Components/Input';
import Button from 'Components/Button';
import { Paragraph } from 'Components/Typography';
import PaginatedSelect from 'Components/PaginatedSelect';

import updateUser from './updateUser';
import {CenteredRow, StyledButton, StyledForm} from './styles';
import { fetchAllProfessions, fetchDoctorProfessions, createNewProfession } from './fetchProfessions';

interface FormItem extends FormItemProps {
  type: string;
  icon?: ReactNode;
}

export type UserInfo = {
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  password: string;
};

export interface Profession {
  id: number;
  name: string;
}

const ProfileEditForm = () => {
  const { state } = useContext(Store);
  const [form] = StyledForm.useForm();

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: UserInfo) => {
    const credentials = {
      user: { ...values, professions: professions.map((profession) => profession.name) },
    };

    setLoading(true);
    try {
      const response = await updateUser(credentials);

      if (response.ok) {
        setLocalStorageResources({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
        });

        pushNotification('success', 'Success', 'Your profile has been updated.');
      } else {
        const { errors } = await response.json();
        Object.entries(errors).forEach(([key, value]) => {
          const description = `${capitalize(key.replaceAll('_', ' '))} ${value}.`;

          formItems.forEach(({ name }) => {
            key === name && form.setFields([{ name: key, errors: [description] }]);
          });
        });
      }
    } catch (error) {
      pushNotification('error', 'Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formItems: FormItem[] = [
    {
      label: 'First name',
      name: 'first_name',
      type: 'text',
      icon: <UserOutlined />,
      rules: [{ required: true, message: 'Please input your first name' }],
    },
    {
      label: 'Last name',
      name: 'last_name',
      type: 'text',
      icon: <UserOutlined />,
      rules: [{ required: true, message: 'Please input your last name' }],
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      icon: <MailOutlined />,
      rules: [{ required: true, message: 'Please input your email' }],
    },
    {
      label: 'Current password',
      name: 'current_password',
      type: 'password',
      rules: [{ required: true, message: 'Please input your current password' }],
    },
    { label: 'New password', name: 'password', type: 'password' },
  ];

  const formItemsJSX = formItems.map(({ label, name, rules, type, icon }, idx) => (
    <StyledForm.Item
      key={idx}
      label={label}
      name={name}
      rules={rules}
      initialValue={name && getLocalStorageResource(name as string)}
    >
      <Input
        type={type}
        placeholder={`Enter your ${label}`}
        password={type === 'password'}
        prefix={icon}
        value={name && getLocalStorageResource(name as string)}
      />
    </StyledForm.Item>
  ));

  const notFoundContentOnClick = async (searchValue: string) => {
    const { success, data, message } = await createNewProfession(searchValue);
    if (success) {
      pushNotification(
        'success',
        'Success',
        `${searchValue} was successfully added to profession pool. Please press submit before leaving!`
      );
      setProfessions([...professions, data]);
    } else {
      pushNotification('error', 'Error', message);
    }
  };

  const notFoundContent = (searchValue: string) => (
    <Paragraph>
      Profession "{searchValue}" not found. Would you like to add it to the list?
      <Button icon={<PlusOutlined />} onClick={() => notFoundContentOnClick(searchValue)}>
        Add Profession
      </Button>
    </Paragraph>
  );

  const selectProfessions = state.accountType === userType.DOCTOR && (
    <StyledForm.Item label="Professions">
      <PaginatedSelect<Profession>
        fetchOptions={fetchAllProfessions}
        fetchInitialValues={fetchDoctorProfessions}
        values={professions}
        setValues={setProfessions}
        notFoundContent={notFoundContent}
        mode="multiple"
        renderOption={(profession: Profession) => profession.name}
      />
    </StyledForm.Item>
  );

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <StyledForm form={form} onFinish={onFinish} layout="vertical">
        <Row>
          <Col span={24}>
            <CenteredRow>
              <Col>
                <Upload accept=".jpg,.png,.gif" showUploadList={false}>
                  <Avatar size={128} icon={<UserOutlined />} alt="profile picture" />
                </Upload>
              </Col>
            </CenteredRow>
            {formItemsJSX}
            {selectProfessions}
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
                <StyledButton htmlType="submit" size="large" loading={loading}>
                  Update Account
                </StyledButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledForm>
    </Spin>
  );
};

export default ProfileEditForm;
