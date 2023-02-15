import React, { useContext, useState } from 'react';
import { Col, Row } from 'antd';
import { capitalize, lowerCase } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { CenteredContainer } from 'Containers/EditProfileForm/styles';
import Button from 'Components/Button';
import pushNotification from 'pushNotification';
import { DoctorProceduresType, FormData } from '../index';
import Input from 'Components/Input';
import { StyledForm } from 'Containers/RegistrationForm/styles';
import { formItem } from 'Containers/EditProfileForm';
import handleEdit from 'Containers/DoctorManageProcedures/editProcedure';
import routes from 'routes';
import { Store } from 'store';

interface EditFormProps {
  setTableState: (date: number) => void;
  procedure: DoctorProceduresType;
  closeEditModal: () => void;
}

const EditForm = ({ setTableState, procedure, closeEditModal }: EditFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = StyledForm.useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);

  const onFinish = async (values: FormData) => {
    setLoading(true);
    try {
      const response = await handleEdit({ id: procedure.id, ...values });

      if (response.ok) {
        setTableState(Date.now());
        pushNotification('success', 'Success', 'Procedure has been updated');
        form.resetFields();

        setTimeout(() => {
          closeEditModal();
        }, 5000);
      } else {
        const responseBody = await response.json();

        Object.entries(responseBody.errors).forEach(([key, value]) => {
          const description = `${capitalize(key.replaceAll('_', ' '))} ${value}.`;

          formItems.forEach(({ name }) => {
            key === name && form.setFields([{ name: key, errors: [description] }]);
          });
        });
      }
    } catch {
      dispatch({ type: 'logout' });
      navigate(routes.logIn.path);
    } finally {
      setLoading(false);
    }
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
      <Col xs={{ span: 24 }} xl={{ span: 16, offset: 4 }}>
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
