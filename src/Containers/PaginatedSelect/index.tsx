import { Divider, message, Pagination, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import Input from '../../Components/Input';

import CustomSelect from '../../Components/Select';
import Button from '../../Components/Button';

export interface searchParameters {
  name: string;
  pageIndex: number;
  perPage: number;
}

export interface PaginatedSelectProps {
  fetchOptions: ({
    name,
    perPage,
    pageIndex,
  }: searchParameters) => Promise<{ total: number; options: string[] } | undefined>;
  fetchInitialValues: () => Promise<string[]>;
  createNewOption: (option: string) => Promise<{ success: boolean; message: string }>;
  values: string[];
  setValues: (values: string[]) => void;
}

const PaginatedSelect = ({
  fetchOptions,
  fetchInitialValues,
  createNewOption,
  values,
  setValues,
}: PaginatedSelectProps) => {
  const fetchRef = useRef(0);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [newOptionValue, setNewOptionValue] = useState<string>('');

  const [options, setOptions] = useState<string[]>([]);

  const debounceFetch = useMemo(() => {
    const loadOptions = ({ name, perPage, pageIndex }: searchParameters) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      fetchOptions({ name: name, perPage: perPage, pageIndex: pageIndex }).then((optionData) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        if (!optionData) {
          return;
        }
        setTotalPages(optionData.total ? optionData.total : 1);
        setOptions(optionData.options);
      });
    };
    return debounce(loadOptions, 600);
  }, [fetchOptions]);

  useEffect(() => {
    fetchInitialValues().then((initialValues) => {
      setValues(initialValues);
    });
    debounceFetch({ name: searchInput, pageIndex: page, perPage: pageSize });
  }, [debounceFetch, fetchInitialValues]);

  return (
    <CustomSelect
      mode="multiple"
      value={values}
      searchValue={searchInput}
      filterOption={false}
      onChange={(newValues: string[]) => {
        setValues(newValues);
      }}
      onSearch={(searchValue: string) => {
        setPage(1);
        setSearchInput(searchValue);
        setNewOptionValue(searchValue);
        debounceFetch({ name: searchValue, pageIndex: 1, perPage: pageSize });
      }}
      notFoundContent={
        <>
          <Input value={newOptionValue} onChange={(event) => setNewOptionValue(event.target.value)}></Input>
          <Divider style={{ margin: '4px 0' }} />
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              createNewOption(newOptionValue).then((response) => {
                response.success
                  ? message.success(
                      `${newOptionValue} was successfully added to profession pool. Please press submit before leaving!`
                    )
                  : message.error(`${newOptionValue} response.message`);
                response.success && setValues([...values, newOptionValue]);
              });
            }}
          >
            Add item
          </Button>
        </>
      }
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <Pagination
              current={page}
              total={totalPages}
              onChange={(newPage, newSize) => {
                setPage(newPage);
                setPageSize(newSize);
                debounceFetch({ name: searchInput, pageIndex: newPage, perPage: newSize });
              }}
            />
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

export default PaginatedSelect;
