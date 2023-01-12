import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Space, Table } from 'antd';
import type { ColumnsType, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { debounce } from 'lodash';

import { FilterDropdown, Input, SearchIcon } from './styles';
import Button from '../Button';

export interface FilterType {
  [field: string]: string;
}

interface ErrorType {
  [field: string]: string[];
}

export interface FetchParams {
  page: number;
  perPage: number;
  filter: FilterType;
}

export interface FetchResponse<T extends TableRecord> {
  data: T[];
  errors?: ErrorType;
  page: number;
  per_page: number;
  total: number;
}

export type TableRecord = {
  id: number;
};

interface PaginatedTableProps<T extends TableRecord> {
  columns: ColumnsType<T>;
  fetchData: ({ page, perPage, filter }: FetchParams) => Promise<FetchResponse<T>>;
  actions?: (text: any, record: T, index: number) => ReactNode;
  pageSizeOptions?: number[];
}

const PaginatedTable = <T extends TableRecord>({
  columns,
  fetchData,
  actions,
  pageSizeOptions = [5, 10, 50],
}: PaginatedTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<FilterType>({});
  const fetchRef = useRef(0);

  const debounceFetch = useMemo(() => {
    const loadData = async ({ page, perPage, filter }: FetchParams) => {
      setLoading(true);
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      const data = await fetchData({ page, perPage, filter });
      if (fetchId !== fetchRef.current || !data) return;

      setTotal(data.total);
      setData(data.data);
      setLoading(false);
    };
    return debounce(loadData, 600);
  }, [fetchData]);

  const handleReset = (dataIndex: string) => {
    setFilter({ ...filter, [dataIndex]: '' });
  };

  const getColumnSearchProps = (dataIndex: string): ColumnType<T> => ({
    filterDropdown: () => (
      <FilterDropdown onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={filter[dataIndex]}
          onChange={(e) => {
            setFilter({ ...filter, [dataIndex]: e.target.value });
            setPage(1);
          }}
        />
        <Space>
          <Button onClick={() => handleReset(dataIndex)} size="small">
            Reset
          </Button>
        </Space>
      </FilterDropdown>
    ),
    filterIcon: () => <SearchIcon />,
  });

  const onTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    setPage(current || 1);
    setPageSize(pageSize || pageSizeOptions[0]);
  };

  useEffect(() => {
    debounceFetch({ page, perPage: pageSize, filter });
  }, [page, pageSize, filter]);

  columns = columns.map((column) =>
    column.filtered ? { ...column, ...getColumnSearchProps(column.key as string) } : column
  );

  actions &&
    (columns = [
      ...columns,
      {
        title: 'Actions',
        key: 'actions',
        render: actions,
      },
    ]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        total,
        pageSizeOptions,
      }}
      onChange={onTableChange}
      rowKey={(record) => record.id}
    />
  );
};

export default PaginatedTable;
