import React from "react";
import { Col, Row } from 'antd';

import CarouselComponent from "./Carousel/CarouselComponent";
import Spinner from "./common/Spinner";
import TableExample from "./examples/TableExample";
import AlertExample from "./examples/AlertExample";
import TypographyExample from "./examples/TypographyExample";
import ButtonExample from "./examples/ButtonExample";
import InputExample from "./examples/InputExample";

const Components: React.FC = () => {
  return (
    <div className="wrapper">
      <Row style={{marginTop:10, height:405}}>
        <Col className="gutter-row" span={11}>
          <TypographyExample/>
        </Col>
        <Col className="gutter-row" span={2}/>
        <Col className="gutter-row" span={11}>
          <CarouselComponent/>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" span={24}>
          <TableExample/>
        </Col>
      </Row>
      <Row style={{marginTop:10}}>
        <Col className="gutter-row" span={24}>
          <InputExample/>
        </Col>
      </Row>
      <Row style={{marginTop:10}}>
        <Col className="gutter-row" span={2}/>
        <Col className="gutter-row" span={4}>
          <ButtonExample/>
        </Col>
        <Col className="gutter-row" span={9}>
          <AlertExample/>
        </Col>
        <Col className="gutter-row" span={9}>
          <Spinner tip={'loading'} content={<AlertExample/>}></Spinner>
        </Col>
      </Row>
    </div>
  );
};

export default Components;
