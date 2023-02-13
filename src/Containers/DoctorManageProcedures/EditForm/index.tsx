import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';

import { CenteredContainer } from 'Containers/EditProfileForm/styles';
import Button from 'Components/Button';
import { getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import pushNotification from 'pushNotification';
import { DoctorProceduresType, FormData } from '../index';
import Input from 'Components/Input';

interface EditFormProps {
  procedure: DoctorProceduresType;
  closeEditModal: () => void;
}

const EditForm = ({ procedure, closeEditModal }: EditFormProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormData) => {
    setLoading(true);
    const token = getLocalStorageResource('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/procedures/${procedure.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          procedure: {
            name: values.procedure_name,
            needed_time_min: values.needed_time,
          },
        }),
      });

      if (response.ok) {
        pushNotification('success', 'Success', 'Procedure has been updated');
      }
    } finally {
      setLoading(false);
      setTimeout(closeEditModal, 5000);
    }
  };

  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <Form className="wrap" onFinish={onFinish}>
            <Form.Item
              label="Procedure name:"
              name="procedure_name"
              rules={[{ required: true, message: 'Please input procedure name' }]}
            >
              <Input type={'text'} prefix={null} />
            </Form.Item>
            <Form.Item
              label="Needed time:"
              name="needed_time"
              rules={[{ required: true, message: 'Please input procedure time' }]}
            >
              <Input min="1" type="number" prefix={null} />
            </Form.Item>
            <CenteredContainer>
              <Button htmlType="submit" loading={loading}>
                Submit
              </Button>
            </CenteredContainer>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditForm;
