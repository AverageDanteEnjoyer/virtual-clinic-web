import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Table, Form, Input, Button, Spin } from 'antd';

import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';
import { StyledDiv } from './styledDiv';

type doctorProceduresType = {
  id: number;
  name: string;
  needed_time_min: number;
};

const DoctorManageProcedures = () => {
  const [doctorProcedures, setDoctorProcedures] = useState<doctorProceduresType[]>([]);
  const [procedureName, setProcedureName] = useState('');
  const [neededTime, setNeededTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setNeededTime(+event.target.value);
  };

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
        const responseDetails = await response.json();
        setDoctorProcedures(responseDetails.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const token = getLocalStorageResource('token');
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/v1/procedures`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'POST',
        body: JSON.stringify({
          procedure: {
            name: procedureName,
            needed_time_min: neededTime,
          },
        }),
      });
      if (response) {
        await getDoctorProcedures();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (record: any) => {
    const token = getLocalStorageResource('token');
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/v1/procedures/${record.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'DELETE',
        body: JSON.stringify({
          procedure: {
            name: procedureName,
            needed_time_min: neededTime,
          },
        }),
      });
      if (response) {
        await getDoctorProcedures();
      }
    } catch (error) {
      console.log(error);
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
      render: (record: any) => {
        return (
          <>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              size="large"
              loading={loading}
              onClick={() => handleDelete(record)}
            >
              DELETE
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <StyledDiv>
        <Form className="wrap" onFinish={handleSubmit}>
          <Form.Item label="Procedure name:" name="procedure">
            <Input
              type="text"
              id="name"
              required
              placeholder="Input your new procedure"
              value={procedureName}
              onChange={(e) => setProcedureName(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Needed time:" name="time">
            <Input min="1" type="number" id="number" required value={neededTime} onChange={handleChangeNumber} />
          </Form.Item>
          <Button type="primary" shape="round" htmlType="submit" size="large" loading={loading}>
            Submit
          </Button>
        </Form>
      </StyledDiv>
      <Spin spinning={loading} tip="waiting for server response...">
        <Table
          loading={loading}
          columns={columns}
          dataSource={doctorProcedures}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Spin>
    </>
  );
};

export default DoctorManageProcedures;
