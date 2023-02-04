import { message, Pagination, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import CustomSelect from '../Select';
import Button from '../Button';
import { StyledTypography as Typography } from '../Typography/styles';
import { NoContentFrame, PaginationFrame, StyledDivider as Divider } from './styles';
import ClearableLabeledInput from 'antd/es/input/ClearableLabeledInput';

interface ErrorType {
  [field: string]: string[];
}

export interface SearchParameters {
  searchValue: string;
  perPage: number;
  pageIndex: number;
}

export interface FetchResponse<T> {
  data: T[];
  errors?: ErrorType;
  total: number;
}

interface PaginatedSelectProps<T> {
  fetchOptions: ({ searchValue, perPage, pageIndex }: SearchParameters) => Promise<FetchResponse<T>>;
  fetchInitialValues?: () => Promise<T[]>;
  values: T[];
  setValues: (values: T[]) => void;
  createNewOption?: (value: string) => Promise<{ success: boolean; message: string }>;
  mode?: 'multiple' | 'tags';
  size?: 'large' | 'middle' | 'small';
  renderOption: (item: T) => React.ReactNode;
  placeholder?: string;
}

const PaginatedSelect = <T,>({
  fetchOptions,
  fetchInitialValues,
  createNewOption,
  values,
  setValues,
  renderOption,
  size = 'middle',
  mode,
  placeholder,
}: PaginatedSelectProps<T>) => {
  const fetchRef = useRef(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');

  const [options, setOptions] = useState<T[]>([]);

  const debounceFetch = useMemo(() => {
    const loadOptions = async ({ searchValue, perPage, pageIndex }: SearchParameters) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      const optionData = await fetchOptions({ searchValue, perPage, pageIndex });
      if (fetchId !== fetchRef.current || !optionData) return;

      setTotalPages(optionData.total ? optionData.total : 1);
      setOptions(optionData.data);
    };

    return debounce(loadOptions, 275);
  }, [fetchOptions]);

  useEffect(() => {
    fetchInitialValues &&
      fetchInitialValues().then((initialValues) => {
        setValues(initialValues);
      });

    debounceFetch({ searchValue: searchInput, pageIndex: page, perPage: pageSize });
  }, [debounceFetch, page, pageSize, searchInput]);

  const onChange = (value: string | string[]) => {
    console.log(value);
    const data = JSON.parse(value as string);
    setValues(data.isArray ? data : [data]);
  };

  const onSearch = (searchValue: string) => {
    setPage(1);
    setSearchInput(searchValue);
    debounceFetch({ searchValue, pageIndex: 1, perPage: pageSize });
  };

  const dropdownRender = (menu: React.ReactNode) => (
    <>
      {menu}
      <Divider />
      <PaginationFrame>
        <Pagination
          current={page}
          total={totalPages}
          onChange={(newPage, newSize) => {
            setPage(newPage);
            setPageSize(newSize);
            debounceFetch({ searchValue: searchInput, pageIndex: newPage, perPage: newSize });
          }}
        />
      </PaginationFrame>
    </>
  );

  // return (
  //   <CustomSelect
  //     size={size}
  //     showSearch={true}
  //     mode={mode}
  //     value={values}
  //     searchValue={searchInput}
  //     filterOption={() => true}
  //     onChange={onChange}
  //     onSearch={onSearch}
  //     // notFoundContent={notFoundContent}
  //     dropdownRender={dropdownRender}
  //     showArrow
  //   >
  //     {options.map((item) => renderOption(item))}
  //   </CustomSelect>
  // );

  return (
    <CustomSelect
      showSearch
      mode={mode}
      size={size}
      placeholder={placeholder}
      value={
        values.length > 0
          ? values.map((item, idx) => {
              return { key: (page - 1) * pageSize + idx, value: idx, label: renderOption(item) };
            })
          : undefined
      }
      onChange={onChange}
      onSearch={onSearch}
      filterOption={false}
      dropdownRender={dropdownRender}
    >
      {options.map((item, idx) => {
        return (
          <Select.Option key={(page - 1) * pageSize + idx} value={JSON.stringify(item)}>
            {renderOption(item)}
          </Select.Option>
        );
      })}
    </CustomSelect>
  );
};

export default PaginatedSelect;
