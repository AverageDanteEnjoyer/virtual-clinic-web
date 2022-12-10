import { Pagination, Select, Divider } from 'antd';
import CustomSelect from '../../Components/Select';
import React, { useState, useMemo } from 'react';
import { getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

interface optionItem {
  key: number;
  name: string;
}

const ProfessionSelector = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [data, setData] = useState<optionItem[]>([]);
  const pageSize = 10;

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
  }, [page, setTotalPages, setData]);

  return (
    <CustomSelect
      mode="multiple"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalPages}
              onChange={(pageIndex) => setPage(pageIndex)}
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
