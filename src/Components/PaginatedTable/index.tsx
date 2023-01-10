import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { InputRef } from 'antd';
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

const PaginatedTable = <T extends TableRecord>({ columns, fetchData, actions }: PaginatedTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<FilterType>({});
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], dataIndex: string) => {
    setFilter({ ...filter, [dataIndex]: selectedKeys[0] });
  };

  const handleReset = (dataIndex: string) => {
    setFilter({ ...filter, [dataIndex]: '' });
  };

  const getColumnSearchProps = (dataIndex: string): ColumnType<T> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [''])}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(dataIndex)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

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
  }, [page, pageSize, filter]);

  columns = columns.map((column) =>
    column.filtered ? { ...column, ...getColumnSearchProps(column.key as string) } : column
  );

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
