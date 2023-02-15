import { Select } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { PaginationFrame, StyledDivider as Divider, StyledPagination, StyledSelect } from './styles';

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
  notFoundContent?: (searchValue: string) => React.ReactNode;
  mode?: 'multiple' | 'tags';
  size?: 'large' | 'middle' | 'small';
  renderOption: (item: T) => React.ReactNode;
  placeholder?: string;
}

const PaginatedSelect = <T,>({
  fetchOptions,
  fetchInitialValues,
  notFoundContent,
  values,
  setValues,
  renderOption,
  size = 'middle',
  mode,
  placeholder,
}: PaginatedSelectProps<T>) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState<T[]>([]);
  const fetchRef = useRef(0);

  const debounceFetch = useMemo(() => {
    const loadOptions = async ({ searchValue, perPage, pageIndex }: SearchParameters) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      const optionData = await fetchOptions({ searchValue, perPage, pageIndex });
      if (fetchId !== fetchRef.current || !optionData) return;

      setTotalPages(optionData.total || 1);
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
  }, []);

  const onChange = (value: string | string[]) => {
    const parsedValue = Array.isArray(value) ? value.map((item) => JSON.parse(item)) : [JSON.parse(value)];
    setValues(parsedValue);
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
        <StyledPagination
          hideOnSinglePage
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

  return (
    <StyledSelect
      mode={mode}
      size={size}
      placeholder={placeholder}
      value={
        values.length > 0
          ? values.map((item) => ({ value: JSON.stringify(item), label: renderOption(item) }))
          : undefined
      }
      onChange={onChange}
      onSearch={onSearch}
      dropdownRender={dropdownRender}
      notFoundContent={notFoundContent ? notFoundContent(searchInput) : undefined}
      showSearch
    >
      {options?.map((item, idx) => {
        return (
          <Select.Option key={idx} value={JSON.stringify(item)}>
            {renderOption(item)}
          </Select.Option>
        );
      })}
    </StyledSelect>
  );
};

export default PaginatedSelect;
