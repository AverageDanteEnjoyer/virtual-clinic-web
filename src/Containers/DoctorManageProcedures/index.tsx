import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { Table, Form, Input, Button, Spin } from 'antd';
import { useState, useEffect, FormEvent } from 'react';
import { API_URL } from '../../api';
import './index.css';

type doctorProceduresType = {
  id: number;
  name: string;
  needed_time_min: number;
};

const DoctorManageProcedures = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [doctorProcedures, setDoctorProcedures] = useState<doctorProceduresType[]>([]);
  const [procedureName, setProcedureName] = useState<string>('');
  const [neededTime, setNeededTime] = useState<string | number>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeededTime(+event.target.value);
  };

  const getDoctorProcedures = async () => {
    setLoading(true);
    const token = getLocalStorageResource('token');
    if (!token) return;
    const { userID } = getDataFromToken();
    try {
      const response = await fetch(`${API_URL}/api/v1/doctors/${userID}/procedures/?per_page=${100}&page=${1}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response) {
        setLoading(false);
        const responseDetails = await response.json();
        setDoctorProcedures(responseDetails.data);
        setTotalPages(responseDetails.data.length);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
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
        getDoctorProcedures();
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
        getDoctorProcedures();
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
            {/* <button}>
              DELETE
            </button> */}
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
      <div className="center">
        <Form className="wrap" onFinish={handleSumbit}>
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
      </div>
      <Spin spinning={loading} tip="waiting for server response...">
        <Table
          loading={loading}
          columns={columns}
          dataSource={doctorProcedures}
          pagination={{
            pageSize: 5,
            total: totalPages,
          }}
        ></Table>
      </Spin>
    </>
  );
};

export default DoctorManageProcedures;
