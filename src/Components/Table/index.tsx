import { ReactNode, useEffect, useState } from 'react';
import { Table as TableAntd } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ErrorType {
  [field: string]: string[];
}
export interface FetchResponse<T extends TableRecord> {
  data: T[];
  errors?: ErrorType;
}

export type TableRecord = {
  id: number;
};

interface TableProps<T extends TableRecord> {
  columns: ColumnsType<T>;
  fetchData: () => Promise<FetchResponse<T>>;
  actions?: (text: any, record: T, index: number) => ReactNode;
}

const Table = <T extends TableRecord>({ columns, fetchData, actions }: TableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);

    const data = await fetchData();
    if (!data) return;

    setData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

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
    <TableAntd
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
};

export default Table;
