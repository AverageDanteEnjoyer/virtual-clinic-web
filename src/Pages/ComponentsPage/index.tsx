import React from 'react';
import { Col, Row } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

import Carousel from '../../Components/Carousel';
import Spin from '../../Components/Spin';
import Table from '../../Components/Table';
import Alert from '../../Components/Alert';
import Typography from '../../Components/Typography';
import Input from '../../Components/Input';
import ComponentsStyles from './Components.module.css';
import Select from '../../Components/Select';
import Button from '../../Components/Button';

const ComponentsPage = () => {
  return (
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
          <Table />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col className="gutter-row" span={24}>
          <Input password={true} />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" span={2} />
        <Col className="gutter-row" span={4}>
          <Button shape="round">Button</Button>
        </Col>
        <Col className="gutter-row" span={9}>
          <Alert
            message={'Our website uses cookies to improve your experience'}
            type="info"
            icon={<InfoCircleFilled style={{ color: 'white' }} />}
          />
        </Col>
        <Col className="gutter-row" span={9}>
          <Spin tip="loading" children={<Alert />} size="small" />
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
  );
};

export default ComponentsPage;
