import { ReactNode, useEffect, useRef, useState } from 'react';
import { Table as TableAntd } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useFetch } from './useFetch';

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

interface TableProps<T extends TableRecord, R> {
  columns: ColumnsType<T>;
  url: string;
  extractData: (response: R) => T[];
  actions?: (text: any, record: T, index: number) => ReactNode;
  rowKey?: (record: T) => string;
}

const Table = <T extends TableRecord, R>({ columns, url, extractData, actions, rowKey }: TableProps<T, R>) => {
  const isComponentMounted = useRef(true);
  const { loading, responseData } = useFetch<R>(url, isComponentMounted, {} as R);

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
      dataSource={extractData(responseData)}
      loading={loading}
      rowKey={rowKey || 'id'}
      pagination={false}
    />
  );
};

export default Table;
