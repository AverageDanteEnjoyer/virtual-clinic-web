import React from 'react';
import { Col, Row } from 'antd';

import StyledCarousel from '../../Components/Carousel/index.';
import StyledSpin from '../../Components/Spin/index.';
import TableExample from '../../Components/Table/index.';
import StyledAlert from '../../Components/Alert';
import TypographyExample from '../../Components/Typography/index.';
import StyledButton from '../../Components/Button';
import StyledInput from '../../Components/Input/index.';
import ComponentsStyles from './Components.module.css';
import StyledSelect from '../../Components/Select/index.';

const ComponentsPage = () => {
  return (
    <div className={ComponentsStyles.wrapper}>
      <Row gutter={[14, 12]}>
        <Col className="gutter-row" span={12}>
          <TypographyExample />
        </Col>
        <Col className="gutter-row" span={12}>
          <StyledCarousel />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col className="gutter-row" span={24}>
          <TableExample />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col className="gutter-row" span={24}>
          <StyledInput />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" span={2} />
        <Col className="gutter-row" span={4}>
          <StyledButton />
        </Col>
        <Col className="gutter-row" span={9}>
          <StyledAlert />
        </Col>
        <Col className="gutter-row" span={9}>
          <StyledSpin tip="loading" children={<StyledAlert />} size="small" />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <StyledSelect
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
        ></StyledSelect>
      </Row>
    </div>
  );
};

export default ComponentsPage;
