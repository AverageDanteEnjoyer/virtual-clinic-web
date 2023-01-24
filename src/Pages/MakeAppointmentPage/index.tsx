import { useContext } from 'react';
import { Col, Row } from 'antd';

import Navbar from '../../Components/Navbar';
import { StyledTitle } from '../../Components/Typography/styles';
import { TitleContext } from '../../Contexts/TitleContext';

const MakeAppointmentPage = () => {
  const { updateTitle } = useContext(TitleContext);

  updateTitle('Make an appointment');

  return (
    <>
      <Navbar />
      <Row>
        <Col span={12} offset={6}>
          <StyledTitle>Make an appointment</StyledTitle>
          <div>
            <p>Choose a doctor</p>

            <p>Choose a procedure</p>

            <p>Choose a date</p>

            <p>Summary</p>

            <button>Make an appointment</button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MakeAppointmentPage;
