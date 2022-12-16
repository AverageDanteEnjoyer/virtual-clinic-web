import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';

import { Divider, Pagination, Select } from 'antd';
import CustomSelect from '../../Components/Select';
import Button from '../../Components/Button';

type doctorProcedures = {
  id: number;
  name: string;
  needed_time_min: number;
};

const DoctorManageProcedures = () => {
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');

  const [doctorProcedures, setDoctorProcedures] = useState<doctorProcedures[]>([]);

  //load current doctor procedures
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
    <div>
      <h1>procedury</h1>
    </div>
  );
};

export default DoctorManageProcedures;
