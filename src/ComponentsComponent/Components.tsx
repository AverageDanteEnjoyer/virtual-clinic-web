import React from "react";
import { Col, Row } from 'antd';

import StyledCarousel from "../Carousel/StyledCarousel";
import StyledSpin from "../common/StyledSpin";
import TableExample from "../examples/TableExample";
import AlertExample from "../examples/AlertExample";
import TypographyExample from "../examples/TypographyExample";
import ButtonExample from "../examples/ButtonExample";
import InputExample from "../examples/InputExample";
import ComponentsStyles from "./ComponentsComponent.module.css"

const Components: React.FC = () => {
  return (
    <div className={ComponentsStyles.wrapper}>
      <Row gutter={[14, 12]}>
        <Col className="gutter-row" span={12}>
          <TypographyExample/>
        </Col>
        <Col className="gutter-row" span={12}>
          <StyledCarousel/>
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col className="gutter-row" span={24}>
          <TableExample/>
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col className="gutter-row" span={24}>
          <InputExample/>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" span={2}/>
        <Col className="gutter-row" span={4}>
          <ButtonExample/>
        </Col>
        <Col className="gutter-row" span={9}>
          <AlertExample/>
        </Col>
        <Col className="gutter-row" span={9}>
          <StyledSpin tip='loading' children={<AlertExample/>}></StyledSpin>
        </Col>
      </Row>
    </div>
  );
};

export default Components;
