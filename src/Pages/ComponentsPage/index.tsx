import { Col, Modal, Row } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

import Carousel from '../../Components/Carousel';
import Spin from '../../Components/Spin';
import Table from '../../Components/Table';
import Alert from '../../Components/Alert';
import Typography from '../../Components/Typography';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import ComponentsStyles from './Components.module.css';
import Navbar from '../../Components/Navbar';
import PaginatedTable, { FetchParams, FetchResponse, TableRecord } from '../../Components/PaginatedTable';
import { getLocalStorageResource } from '../../localStorageAPI';
import { API_URL } from '../../api';
import { useState } from 'react';

interface Procedure extends TableRecord {
  user_id: number;
  name: string;
  needed_time_min: number;
  created_at: string;
  updated_at: string;
}

const ComponentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // I leave it here to others, who may not know how to correctly use it.
  const paginatedTableFetchData = async ({ page, perPage, filter }: FetchParams): Promise<FetchResponse<Procedure>> => {
    const token = getLocalStorageResource('token');
    if (!token) return { data: [], page, per_page: perPage, total: 0 };

    const filterString = Object.keys(filter)
      .map((key) => `${key}=${filter[key] as string}`)
      .join('&');

    const response = await fetch(`${API_URL}/api/v1/procedures/?page=${page}&per_page=${perPage}&${filterString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return response.json();
  };

  const paginatedTableColumns: ColumnsType<Procedure> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filtered: true,
    },
    {
      title: 'Needed time',
      dataIndex: 'needed_time_min',
      key: 'needed_time_min',
    },
  ];

  const paginatedTableActions = (text: any, record: Procedure, index: number) => {
    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        <Button type="primary" onClick={showModal}>
          View
        </Button>
        <Modal title="Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>ID: {record.id}</p>
          <p>Name: {record.name}</p>
          <p>Doctor's ID: {record.user_id}</p>
          <p>Needed time: {record.needed_time_min}</p>
          <p>Created at: {record.created_at}</p>
          <p>Updated at: {record.updated_at}</p>
          <p>Index: {index}</p>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className={ComponentsStyles.wrapper}>
        <Row gutter={[14, 12]}>
          <Col className="gutter-row" span={12}>
            <Typography />
          </Col>
          <Col className="gutter-row" span={12}>
            <Carousel />
          </Col>
        </Row>
        <Row gutter={[14, 12]}>
          <Col className="gutter-row" span={24}>
            <PaginatedTable<Procedure>
              fetchData={paginatedTableFetchData}
              columns={paginatedTableColumns}
              actions={paginatedTableActions}
            />
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col className="gutter-row" span={24}>
            <Table />
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col className="gutter-row" span={24}>
            <Input password />
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col className="gutter-row" span={2} />
          <Col className="gutter-row" span={4}>
            <Button shape="round">Button</Button>
          </Col>
          <Col className="gutter-row" span={9}>
            <Alert
              message="Our website uses cookies to improve your experience"
              type="info"
              icon={<InfoCircleFilled style={{ color: 'white' }} />}
            />
          </Col>
          <Col className="gutter-row" span={9}>
            <Spin tip="loading" size="small">
              <Alert />
            </Spin>
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Select
            mode="multiple"
            customOptions={[
              {
                label: 'gr1',
                children: [
                  { label: 'item1', value: 'item1' },
                  { label: 'item2', value: 'item2' },
                ],
              },
            ]}
            defaultValue={['item1', 'item2']}
          ></Select>
        </Row>
      </div>
    </>
  );
};

export default ComponentsPage;
