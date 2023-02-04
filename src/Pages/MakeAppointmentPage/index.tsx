import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import Navbar from '../../Components/Navbar';
import { StyledTitle } from '../../Components/Typography/styles';
import { TitleContext } from '../../Contexts/TitleContext';
import PaginatedSelect from '../../Components/PaginatedSelect';
import fetchAllDoctors from './fetchDoctors';
import { DoctorEmail, DoctorIcon, DoctorInfo, DoctorOption, Paragraph } from './styles';

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const MakeAppointmentPage = () => {
  const { updateTitle } = useContext(TitleContext);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    updateTitle('Make an appointment');
  }, [updateTitle, doctors]);

  const renderOption = (doctor: Doctor) => (
    <DoctorOption>
      <Col>
        <DoctorIcon />
      </Col>
      <DoctorInfo>
        <Paragraph>
          {doctor.first_name} {doctor.last_name}
        </Paragraph>
        <DoctorEmail>{doctor.email}</DoctorEmail>
      </DoctorInfo>
    </DoctorOption>
  );

  return (
    <>
      <Navbar />
      <Row>
        <Col span={8} offset={8}>
          <StyledTitle>Make an appointment</StyledTitle>
          <div>
            <p>Choose a doctor</p>
            <PaginatedSelect<Doctor>
              size="large"
              fetchOptions={fetchAllDoctors}
              values={doctors}
              setValues={setDoctors}
              renderOption={renderOption}
              placeholder="Search for a doctor"
            />
            {doctors.length > 0 && doctors[0].id !== 0 && (
              <p>
                {doctors[0].id} {doctors[0].first_name} {doctors[0].last_name} {doctors[0].email}
              </p>
            )}
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
