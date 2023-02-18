import { useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { TableLocale } from 'antd/es/table/interface';

import { useFetch } from 'Hooks/useFetch';

import { StyledTable } from './styles';

export type TableRecord = {
  id: number;
};

interface TableProps<T extends TableRecord, R> {
  data: T[];
  setData: (data: T[]) => void;
  columns: ColumnsType<T>;
  url: string;
  locale: TableLocale;
  extractData: (response: R) => T[];
  rowKey?: (record: T) => string;
}

const Table = <T extends TableRecord, R>({
  data,
  setData,
  columns,
  url,
  locale,
  extractData,
  rowKey,
}: TableProps<T, R>) => {
  const { loading, responseData } = useFetch<R>(url, {} as R);

  useEffect(() => {
    if (responseData) {
      setData(extractData(responseData));
    }
  }, [responseData]);

  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      locale={locale}
      rowKey={rowKey || 'id'}
      loading={loading}
      pagination={false}
    />
  );
};

export default Table;
