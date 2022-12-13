import { Divider, Pagination, Select } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

import CustomSelect from '../../Components/Select';
import Button from '../../Components/Button';

const ProfessionSelector = () => {
  const fetchRef = useRef(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');

  const [allProfessions, setAllProfessions] = useState<string[]>([]);
  const [myProfessions, setMyProfessions] = useState<string[]>([]);

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
      setMyProfessions(responseDetails.data.map((value: { key: number; name: string }) => value.name));
    };
    loadProfessions();
  }, []);

  const debounceFetch = useMemo(() => {
    const fetchOptions = () => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      const token = getLocalStorageResource('token');
      if (!token) return;
      fetch(`${API_URL}/api/v1/professions/?name=${searchInput}&per_page=${pageSize}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((responseDetails) => {
          if (fetchId !== fetchRef.current) {
            return;
          }
          setTotalPages(responseDetails.total);
          setAllProfessions(responseDetails.data.map((value: { key: number; name: string }) => value.name));
        });
    };
    return debounce(fetchOptions, 1000);
  }, [page, pageSize, searchInput]);

  useMemo(() => {
    debounceFetch();
  }, [page, pageSize, searchInput]);

  const submitProfessions = () => {
    const token = getLocalStorageResource('token');
    if (!token) return;

    fetch(`${API_URL}/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ user: { professions: myProfessions, current_password: '11aasasasaaaaa' } }), //type your password manually here. It will be assembled with Edit_account soon
    });
  };

  return (
    <CustomSelect
      mode="multiple"
      value={myProfessions}
      filterOption={false}
      onChange={(values: string[]) => {
        setMyProfessions(values);
      }}
      onSearch={(value: string) => {
        setPage(1);
        setSearchInput(value);
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '22%', margin: '0 3%' }}>
            <Pagination
              current={page}
              total={totalPages}
              onChange={(pageIndex, pageSize) => {
                setPage(pageIndex);
                setPageSize(pageSize);
              }}
            />
            <Button size="large" onClick={submitProfessions}>
              Submit changes
            </Button>
          </div>
        </>
      )}
      showArrow
    >
      {allProfessions &&
        allProfessions.map((item, idx) => {
          return (
            <Select.Option key={(page - 1) * pageSize + idx} value={item}>
              {item}
            </Select.Option>
          );
        })}
    </CustomSelect>
  );
};

export default ProfessionSelector;
