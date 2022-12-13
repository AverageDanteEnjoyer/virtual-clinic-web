import { Divider, Pagination, Select } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';

import CustomSelect from '../../Components/Select';
import Button from '../../Components/Button';

export interface searchParameters {
  name?: string;
  pageIndex?: number;
  perPage?: number;
}

export interface PaginatedSelectProps {
  fetchOptions: ({ name, perPage, pageIndex }: searchParameters) => Promise<any>;
  fetchInitialValues: () => Promise<any>;
}

const ProfessionSelector = ({ fetchOptions, fetchInitialValues }: PaginatedSelectProps) => {
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
    fetchInitialValues().then((responseDetails) => {
      setMyProfessions(responseDetails.data.map((value: { key: number; name: string }) => value.name));
    });
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
