import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface TableData {
  id: number;
}

export interface ColumnType<T extends TableData> extends ColumnsType<T> {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
}

export interface PaginatedTableProps<T extends TableData> {
  columns: ColumnType<T>[];
  fetchData: (page: number, pageSize: number) => Promise<{ data: T[]; page: number; per_page: number; total: number }>;
  actions?: (text: any, record: T, index: number) => React.ReactNode;
}

const PaginatedTable = <T extends TableData>(props: PaginatedTableProps<T>) => {
  const { columns, fetchData, actions } = props;

  const [data, setData] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [total, setTotal] = React.useState(0);

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData(page, pageSize).then((response) => {
      setData(response.data);
      setTotal(response.total);
      setLoading(false);
    });
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
      onChange={handleTableChange}
      rowKey={(record) => record.id}
    />
  );
};

export default PaginatedTable;
