import { Col, Row } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

import Carousel from 'Components/Carousel';
import Spin from 'Components/Spin';
import Alert from 'Components/Alert';
import Typography from 'Components/Typography';
import Input from 'Components/Input';
import Select from 'Components/Select';
import Button from 'Components/Button';
import Navbar from 'Components/Navbar';

import useTitle from 'Hooks/useTitle';

import ComponentsStyles from './Components.module.css';

const ComponentsPage = () => {
  useTitle();

  // I leave it here to others, who may not know how to correctly use it.
  // const paginatedTableFetchData = async ({ page, perPage, filter }: FetchParams): Promise<FetchResponse<Procedure>> => {
  //   const token = getLocalStorageResource('token');
  //   if (!token) return { data: [], page, per_page: perPage, total: 0 };
  //
  //   const filterString = Object.keys(filter)
  //     .map((key) => `${key}=${filter[key] as string}`)
  //     .join('&');
  //
  //   const response = await fetch(`${API_URL}/api/v1/procedures/?page=${page}&per_page=${perPage}&${filterString}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token,
  //     },
  //   });
  //
  //   return response.json();
  // };

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
