import { ReactNode, useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

export interface FetchResponse<T extends TableRecord> {
  data: T[];
  errors?: { [field: string]: string[] };
  page: number;
  per_page: number;
  total: number;
}

export interface TableRecord {
  id: number;
}

export interface TableColumnType<T extends TableRecord> extends ColumnsType<T> {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: T, index: number) => ReactNode;
}

export interface PaginatedTableProps<T extends TableRecord> {
  columns: TableColumnType<T>[];
  fetchData: (page: number, pageSize: number) => Promise<FetchResponse<T>>;
  actions?: (text: any, record: T, index: number) => ReactNode;
}

const PaginatedTable = <T extends TableRecord>({ columns, fetchData, actions }: PaginatedTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const onTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 5);
  };

  useEffect(() => {
    setLoading(true);
    const fetchDataAsync = async () => {
      const response: FetchResponse<T> = await fetchData(page, pageSize);
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
