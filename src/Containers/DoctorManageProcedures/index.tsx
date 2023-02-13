import React, { useState, useEffect } from 'react';
import { Table, Form, Spin, Col, Row } from 'antd';
import { capitalize } from 'lodash';

import { getDataFromToken, getLocalStorageResource } from 'localStorageAPI';
import { API_URL } from 'api';
import pushNotification from 'pushNotification';
import { CenteredContainer } from 'Containers/EditProfileForm/styles';
import Input from 'Components/Input';
import Button from 'Components/Button';

interface DoctorProceduresType {
  id: number;
  name: string;
  needed_time_min: number;
}

interface FormData {
  procedure_name: string;
  needed_time: number;
}

const DoctorManageProcedures = () => {
  const [doctorProcedures, setDoctorProcedures] = useState<DoctorProceduresType[]>([]);
  const [loading, setLoading] = useState(false);

  const getDoctorProcedures = async () => {
    setLoading(true);
    const token = getLocalStorageResource('token');
    if (!token) return;
    const { userID } = getDataFromToken();

    try {
      const response = await fetch(`${API_URL}/api/v1/doctors/${userID}/procedures/?per_page=${100}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response) {
        const responseBody = await response.json();
        setDoctorProcedures(responseBody.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: FormData) => {
    const token = getLocalStorageResource('token');
    if (!token) return;

    const response = await fetch(`${API_URL}/api/v1/procedures`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({
        procedure: {
          name: values.procedure_name,
          needed_time_min: values.needed_time,
        },
      }),
    });

    if (response.ok) {
      await getDoctorProcedures();
      pushNotification('success', 'Success', 'Procedure has been added!');
    } else if (response.status === 422) {
      const responseBody = await response.json();
      Object.entries(responseBody.errors).map(([key, message]) =>
        pushNotification('error', 'Error', `${capitalize(key)} ${message}`.replaceAll('_', ' '))
      );
    }
  };

  const handleDelete = async (record: DoctorProceduresType) => {
    const token = getLocalStorageResource('token');
    if (!token) return;

    const response = await fetch(`${API_URL}/api/v1/procedures/${record.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'DELETE',
      body: JSON.stringify({
        procedure: {
          name: record.name,
          needed_time_min: record.needed_time_min,
        },
      }),
    });

    if (response.ok) {
      await getDoctorProcedures();
      pushNotification('success', 'Success', 'Procedure has been deleted!');
    }
  };

  useEffect(() => {
    getDoctorProcedures();
  }, []);

  const columns = [
    {
      title: 'Procedure ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Procedure name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Procedure time(min)',
      dataIndex: 'needed_time_min',
      key: 'needed_time_min',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: DoctorProceduresType) => {
        return (
          <CenteredContainer>
            <Button htmlType="submit" loading={loading} onClick={() => handleDelete(record)}>
              DELETE
            </Button>
          </CenteredContainer>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={[0, 15]}>
        <Col span={6} offset={9}>
          <Form className="wrap" onFinish={onFinish}>
            <Form.Item label="Procedure name:" name="procedure_name" required={true}>
              <Input type={'text'} placeholder={'Input your new procedure'} prefix={null} />
            </Form.Item>
            <Form.Item label="Needed time:" name="needed_time" required={true}>
              <Input min="1" type="number" prefix={null} />
            </Form.Item>
            <CenteredContainer>
              <Button htmlType="submit" loading={loading}>
                Submit
              </Button>
            </CenteredContainer>
          </Form>
        </Col>
        <Col span={12} offset={6}>
          <Spin spinning={loading} tip="waiting for server response...">
            <Table
              loading={loading}
              columns={columns}
              dataSource={doctorProcedures}
              pagination={{
                position: ['bottomCenter'],
                pageSize: 4,
              }}
            />
          </Spin>
        </Col>
      </Row>
    </>
  );
};

export default DoctorManageProcedures;
