import { useContext, useEffect } from 'react';
import { Col, Row } from 'antd';

import Navbar from '../../Components/Navbar';
import { StyledTitle } from '../../Components/Typography/styles';
import { TitleContext } from '../../Contexts/TitleContext';
import PaginatedSelect from '../../Components/PaginatedSelect';
import fetchAllDoctors from './fetchDoctors';

const MakeAppointmentPage = () => {
  const { updateTitle } = useContext(TitleContext);

  useEffect(() => {
    updateTitle('Make an appointment');
  }, [updateTitle]);

  return (
    <>
      <Navbar />
      <Row>
        <Col span={12} offset={6}>
          <StyledTitle>Make an appointment</StyledTitle>
          <div>
            <p>Choose a doctor</p>
            <PaginatedSelect
              fetchOptions={fetchAllDoctors}
              fetchInitialValues={() => Promise.resolve([])}
              createNewOption={() => Promise.resolve({ success: true, message: '' })}
              values={[]}
              setValues={() => {}}
            />

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
