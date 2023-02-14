import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { capitalize, lowerCase } from 'lodash';

import { CenteredContainer } from 'Containers/EditProfileForm/styles';
import Button from 'Components/Button';
import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import pushNotification from 'pushNotification';
import { DoctorProceduresType, FormData } from '../index';
import Input from 'Components/Input';
import { StyledForm } from 'Containers/RegistrationForm/styles';
import { formItem } from 'Containers/EditProfileForm';
import { Procedure } from 'Containers/DoctorManageProcedures/fetchProcedures';

interface EditFormProps {
  data: Procedure[];
  setData: (data: Procedure[]) => void;
  procedure: DoctorProceduresType;
  closeEditModal: () => void;
}

const EditForm = ({ data, setData, procedure, closeEditModal }: EditFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = StyledForm.useForm();

  const onFinish = async (values: FormData) => {
    setLoading(true);
    const token = getLocalStorageResource('token');
    if (!token) return;

    const response = await fetch(`${API_URL}/api/v1/procedures/${procedure.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        procedure: {
          name: values.name,
          needed_time_min: values.needed_time_min,
        },
      }),
    });

    if (response.ok) {
      const responseBody = await response.json();
      setData(data.map((procedure) => (procedure.id === responseBody.data.id ? responseBody.data : procedure)));
      pushNotification('success', 'Success', 'Procedure has been updated');
    } else if (response.status === 422) {
      const responseBody = await response.json();
      Object.entries(responseBody.errors).forEach(([key, value]) => {
        const description = `${capitalize(key.replaceAll('_', ' '))} ${value}.`;

        formItems.forEach(({ name }) => {
          key === name && form.setFields([{ name: key, errors: [description] }]);
        });
      });
    }

    setTimeout(() => {
      closeEditModal();
    }, 5000);

    setLoading(false);
  };

  const formItems: formItem[] = [
    {
      name: 'name',
      label: 'Procedure name:',
      type: 'text',
      rules: [{ required: true, message: 'Please input procedure name' }],
    },
    {
      name: 'needed_time_min',
      label: 'Procedure time:',
      type: 'number',
      rules: [{ required: true, message: 'Please input procedure time' }],
    },
  ];

  const formItemsJSX = formItems.map(({ name, label, type, rules }, idx) => (
    <StyledForm.Item key={idx} label={label} name={name} rules={rules}>
      <Input type={type} prefix={null} placeholder={`Enter your ${lowerCase(label as string)}`} />
    </StyledForm.Item>
  ));

  return (
    <Row>
      <Col span={16} offset={4}>
        <StyledForm form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
          {formItemsJSX}
          <CenteredContainer>
            <Button htmlType="submit" loading={loading}>
              Submit
            </Button>
          </CenteredContainer>
        </StyledForm>
      </Col>
    </Row>
  );
};

export default EditForm;
