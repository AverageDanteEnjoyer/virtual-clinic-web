import './index.css';
import { API_URL } from '../../api';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import Spin from '../../Components/Spin';
import { useState, useEffect, FormEvent } from 'react';
import { Col, Form, FormItemProps, Row, Table } from 'antd';

type doctorProceduresType = {
  id: number;
  name: string;
  needed_time_min: number;
};

const DoctorManageProcedures = () => {
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [doctorProcedures, setDoctorProcedures] = useState<doctorProceduresType[]>([]);
  const [procedureName, setProcedureName] = useState<string>('');
  const [neededTime, setNeededTime] = useState<string | number>('');
  const [loading, setLoading] = useState(false);

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeededTime(+event.target.value);
  };

  const getDoctorProcedures = async () => {
    setLoading(true);
    const token = getLocalStorageResource('token');
    if (!token) return;
    const { userID } = getDataFromToken();
    const response = await fetch(`${API_URL}/api/v1/doctors/${userID}/procedures/?per_page=${100}&page=${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const responseDetails = await response.json();
    console.log(responseDetails);
    setLoading(false);
    setDoctorProcedures(responseDetails.data);
    setTotalPages(responseDetails.data.length);
    console.log(responseDetails.data);
  };

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = getLocalStorageResource('token');
    if (!token) return;

    await fetch(`${API_URL}/api/v1/procedures`, {
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
    }).then(function (response) {
      console.log(response);
    });
    console.log('wywołaj get');
    getDoctorProcedures();
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
      title: 'delete',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <div className="center">
        <form className="wrap" onSubmit={handleSumbit}>
          <fieldset className="field-area">
            <label htmlFor="name">Procedure name:</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Input your new procedure"
              value={procedureName}
              onChange={(e) => setProcedureName(e.target.value)}
            />
          </fieldset>
          <fieldset className="field-area">
            <label htmlFor="num">Needed time:</label>
            <input
              type="number"
              id="number"
              required
              value={neededTime}
              onChange={handleChangeNumber}
              className="inp-num"
            />
          </fieldset>
          <button type="submit">Add</button>
        </form>
      </div>
      <Spin spinning={loading} tip="waiting for server response...">
        <Table
          loading={loading}
          columns={columns}
          dataSource={doctorProcedures}
          pagination={{
            pageSize: 5,
            total: totalPages,
            onChange: (page) => {
              console.log(page);
              setActualPage(page);
            },
          }}
        ></Table>
      </Spin>
    </>
  );
};

export default DoctorManageProcedures;
