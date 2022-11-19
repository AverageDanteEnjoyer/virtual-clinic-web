import React from 'react';
import { Space, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  id:number;
  name: string;
  age: number;
  date:Date,
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: date => <a>{date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}</a>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Postpone {record.name}</a>
        <a>Cancel</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    id: 1,
    name: 'John Brown',
    age: 32,
    date: new Date(2022, 12, 21, 8, 30),
  },
  {
    key: '2',
    id: 2,
    name: 'Jim Green',
    age: 42,
    date: new Date(2022, 12, 21, 10, 30),
  },
  {
    key: '3',
    id: 3,
    name: 'Joe Black',
    age: 22,
    date: new Date(2022, 12, 22, 8, 30),
  },
];

const AppointmentTable: React.FC = () => <Table columns={columns} dataSource={data} />;

export default AppointmentTable;
