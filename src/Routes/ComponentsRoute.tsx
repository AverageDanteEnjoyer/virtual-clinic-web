import React from 'react';
import { Col, Row } from 'antd';

import StyledCarousel from '../Components/Carousel/StyledCarousel';
import StyledSpin from '../Components/Spin/StyledSpin';
import TableExample from '../Components/Table/TableExample';
import StyledAlert from '../Components/Alert/StyledAlert';
import TypographyExample from '../Components/Typography/TypographyExample';
import StyledButton from '../Components/Button/StyledButton';
import StyledInput from '../Components/Input/StyledInput';
import ComponentsStyles from './Routes.module.css';
import StyledSelect from '../Components/Select/StyledSelect';

const ComponentsRoute: React.FC = () => {
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

export default ComponentsRoute;
