import React from 'react';
import { Col, Row } from 'antd';

import StyledCarousel from '../../Components/Carousel';
import StyledSpin from '../../Components/Spin';
import TableExample from '../../Components/Table';
import StyledAlert from '../../Components/Alert';
import TypographyExample from '../../Components/Typography';
import StyledInput from '../../Components/Input';
import ComponentsStyles from './Components.module.css';
import StyledSelect from '../../Components/Select';
import StyledButton from '../../Components/Button/StyledButton';

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
          <StyledInput password={true} />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" span={2} />
        <Col className="gutter-row" span={4}>
          <StyledButton>Button</StyledButton>
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
