import { Divider, Pagination, Select } from 'antd';
import CustomSelect from '../../Components/Select';
import React, { useEffect, useMemo, useState } from 'react';
import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

interface optionItem {
  key: number;
  name: string;
}

const ProfessionSelector = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const [data, setData] = useState<optionItem[]>([]);
  const [myProfessions, setMyProfessions] = useState<optionItem[]>([]);

  useEffect(() => {
    const loadProfessions = async () => {
      const token = getLocalStorageResource('token');
      const { userID } = getDataFromToken();
      if (!token) return;
      const response = await fetch(`${API_URL}/api/v1/doctors/${userID}/professions/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const responseDetails = await response.json();
      setMyProfessions(responseDetails.data);
    };
    loadProfessions();
  }, []);

  useMemo(() => {
    const loadPage = async () => {
      const token = getLocalStorageResource('token');
      if (!token) return;
      const response = await fetch(`${API_URL}/api/v1/professions/?per_page=${pageSize}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const responseDetails = await response.json();
      setTotalPages(responseDetails.total);
      setData(responseDetails.data);
    };
    loadPage();
  }, [page, pageSize, setTotalPages, setData]);

  return (
    <CustomSelect
      mode="multiple"
      defaultValue={myProfessions.map((item) => item.name)}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <Pagination
              current={page}
              total={totalPages}
              onChange={(pageIndex, pageSize) => {
                setPage(pageIndex);
                setPageSize(pageSize);
              }}
            />
          </div>
        </>
      )}
      showArrow
    >
      {data &&
        data.map((item, idx) => {
          return (
            <Select.Option key={(page - 1) * pageSize + idx} value={item.name}>
              {item.name}
            </Select.Option>
          );
        })}
    </CustomSelect>
  );
};

export default ProfessionSelector;
