import React, { ReactNode, useState, useEffect } from 'react';
import { Button, Input, Table } from 'antd';
import type { ColumnsType, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';

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

export function tableColumnTextFilterConfig<T>(): ColumnType<T> {
  const searchInputHolder: { current: any } = { current: null };

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => (searchInputHolder.current = node)}
            placeholder={'Search'}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button size="small" style={{ width: 90 }} onClick={clearFilters}>
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputHolder.current);
      }
    },
  };
}

const PaginatedTable = <T extends TableRecord>({ columns, fetchData, actions }: PaginatedTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<FilterType>({ name: '123' });

  const onTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 5);
  };

  useEffect(() => {
    setLoading(true);
    const fetchDataAsync = async () => {
      const response = await fetchData({ page, perPage: pageSize, filter: filter });
      setData(response.data);
      setTotal(response.total);
      setLoading(false);
    };

    fetchDataAsync();
  }, [page, pageSize]);

  const columnsWithActions = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      render: actions,
    },
  ];

  return (
    <Table
      columns={actions ? columnsWithActions : columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: total,
      }}
      onChange={onTableChange}
      rowKey={(record) => record.id}
    />
  );
};

export default PaginatedTable;
