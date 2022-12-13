import { Divider, Pagination, Select } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { getDataFromToken, getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

import CustomSelect from '../../Components/Select';
import Button from '../../Components/Button';

interface searchParameters {
  name?: string;
  pageIndex?: number;
  perPage?: number;
}

const fetchOptions = async ({ name, perPage, pageIndex }: searchParameters) => {
  const token = getLocalStorageResource('token');
  if (!token) return;
  return fetch(`${API_URL}/api/v1/professions/?name=${name}&per_page=${perPage}&page=${pageIndex}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((response) => response.json());
};

const ProfessionSelector = () => {
  const fetchRef = useRef(0);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');

  const [options, setOptions] = useState<string[]>([]);
  const [myProfessions, setMyProfessions] = useState<string[]>([]);

  const debounceFetch = useMemo(() => {
    const loadOptions = ({ name = searchInput, perPage = pageSize, pageIndex = page }: searchParameters) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      fetchOptions({ name: name, perPage: perPage, pageIndex: pageIndex }).then((responseDetails) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setTotalPages(responseDetails.total ? responseDetails.total : 1);
        setOptions(responseDetails.data.map((value: { key: number; name: string }) => value.name));
      });
    };
    return debounce(loadOptions, 800);
  }, []);

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
    debounceFetch({});
  }, [debounceFetch]);

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
        debounceFetch({ name: value });
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
                debounceFetch({ pageIndex: pageIndex, perPage: pageSize });
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
      {options &&
        options.map((item, idx) => {
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
