import { ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import { Space, Table } from 'antd';
import type { ColumnsType, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import { FilterDropdown } from './styles';
import Button from '../Button';
import { StyledTableInput } from '../Input/styles';

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
}

const PaginatedTable = <T extends TableRecord>({ columns, fetchData, actions }: PaginatedTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<FilterType>({});
  const fetchRef = useRef(0);

  const debounceFetch = useMemo(() => {
    const loadData = ({ page, perPage, filter }: FetchParams) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setLoading(true);
      fetchData({ page, perPage, filter }).then((data) => {
        if (fetchId !== fetchRef.current || !data) return;
        setTotal(data.total);
        setData(data.data);
        setLoading(false);
      });
    };
    return debounce(loadData, 600);
  }, [fetchData]);

  const handleReset = (dataIndex: string) => {
    setFilter({ ...filter, [dataIndex]: '' });
  };

  const getColumnSearchProps = (dataIndex: string): ColumnType<T> => ({
    filterDropdown: () => (
      <FilterDropdown onKeyDown={(e) => e.stopPropagation()}>
        <StyledTableInput
          placeholder={`Search ${dataIndex}`}
          value={filter[dataIndex]}
          onChange={(e) => {
            setFilter({ ...filter, [dataIndex]: e.target.value });
            setPage(1);
          }}
        />
        <Space>
          <Button onClick={() => handleReset(dataIndex)} size={'small'}>
            Reset
          </Button>
        </Space>
      </FilterDropdown>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  });

  const onTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 5);
  };

  useEffect(() => {
    debounceFetch({ page, perPage: pageSize, filter: filter });
  }, [page, pageSize, filter]);

  columns = columns.map((column) =>
    column.filtered ? { ...column, ...getColumnSearchProps(column.key as string) } : column
  );

  columns = [
    ...columns,
    actions
      ? {
          title: 'Actions',
          key: 'actions',
          render: actions,
        }
      : {},
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: total,
        pageSizeOptions: [5, 10, 20],
      }}
      onChange={onTableChange}
      rowKey={(record) => record.id}
    />
  );
};

export default PaginatedTable;
