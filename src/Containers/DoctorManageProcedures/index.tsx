import { useState, useEffect, FormEvent } from 'react';
import { Col, Form, FormItemProps, Row } from 'antd';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import Spin from '../../Components/Spin';
import { API_URL } from '../../api';
import './index.css';

export interface formItem extends FormItemProps {
  type: string;
}

type doctorProcedures = {
  id: number;
  name: string;
  needed_time_min: number;
};

// type procedureInfo = {
//   name: string;
//   needed_time_min: number;
// };

const DoctorManageProcedures = () => {
  // const [actualPage, setActualPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(0);
  // const [perPage, setPerPage] = useState<number>(10);
  // const [searchInput, setSearchInput] = useState<string>('');
  const [doctorProcedures, setDoctorProcedures] = useState<doctorProcedures[]>([]);
  const [procedureName, setProcedureName] = useState<string>('');
  const [neededTime, setNeededTime] = useState<string | number>('');

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeededTime(+event.target.value);
  };

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      type: 'success' | 'warning' | 'error' | 'info';
      message: string;
      description?: string;
    }[]
  >([]);

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
  };

  useEffect(() => {
    const getDoctorProcedures = async () => {
      const token = getLocalStorageResource('token');
      if (!token) return;
      const { userID } = getDataFromToken();
      const response = await fetch(
        `${API_URL}/api/v1/doctors/${userID}/procedures/?name=${searchInput}&per_page=${perPage}&page=${actualPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      const responseDetails = await response.json();
      console.log(responseDetails);
      setDoctorProcedures(responseDetails.data);
    };

    getDoctorProcedures();
  }, []);

  return (
    <Spin spinning={loading} tip="waiting for server response...">
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
    </Spin>
  );
};

export default DoctorManageProcedures;
