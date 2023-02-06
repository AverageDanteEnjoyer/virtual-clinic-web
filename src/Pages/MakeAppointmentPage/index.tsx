import { useContext, useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
import dayjs from 'dayjs';

import Navbar from '../../Components/Navbar';
import { StyledParagraph, StyledTitle } from '../../Components/Typography/styles';
import { TitleContext } from '../../Contexts/TitleContext';
import PaginatedSelect from '../../Components/PaginatedSelect';
import fetchAllDoctors from './fetchDoctors';
import { DoctorEmail, DoctorIcon, DoctorInfo, DoctorOption, Paragraph } from './styles';
import { getFetchDoctorProcedures } from './fetchDoctorProcedures';
import TimeTable from '../../Containers/TimeTable';
import { SubmitBox } from '../../Containers/TimeTable/styles';
import { StyledButton } from '../../Components/Button/styles';

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Procedure {
  id: number;
  name: string;
  needed_time_min: number;
}

const MakeAppointmentPage = () => {
  const { updateTitle } = useContext(TitleContext);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    updateTitle('Make an appointment');
  }, []);

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
      <StyledTitle center="true">Make an appointment</StyledTitle>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} xl={{ span: 8, offset: 6 }} md={{ span: 16 }}>
          <Row>
            <Col style={{ width: '100%' }}>
              <StyledTitle level={2}>Select a doctor</StyledTitle>
              <PaginatedSelect<Doctor>
                size="large"
                fetchOptions={fetchAllDoctors}
                values={doctors}
                setValues={(values: Doctor[]) => {
                  setDoctors(values);
                  setProcedures([]);
                  setDate(dayjs().format('YYYY-MM-DD'));
                  setSelectedTime('');
                }}
                renderOption={renderOption}
                placeholder="Search for a doctor"
                notFoundContent={(searchValue) => <p>No doctors found for {searchValue}</p>}
              />
              {doctors.length > 0 && (
                <>
                  <StyledTitle level={2}>Select a procedure</StyledTitle>
                  <PaginatedSelect<Procedure>
                    size="large"
                    fetchOptions={getFetchDoctorProcedures(doctors[0].id)}
                    values={procedures}
                    setValues={(values: Procedure[]) => {
                      setProcedures(values);
                      setDate(dayjs().format('YYYY-MM-DD'));
                      setSelectedTime('');
                    }}
                    renderOption={(procedure) => <>{procedure.name}</>}
                    placeholder="Search for a procedure"
                    notFoundContent={(searchValue) => <p>No procedures found for {searchValue}</p>}
                  />
                </>
              )}
              {procedures.length > 0 && (
                <>
                  <StyledTitle level={2}>Select a date</StyledTitle>
                  <DatePicker
                    presets={[
                      { label: 'Today', value: dayjs() },
                      { label: 'Tomorrow', value: dayjs().add(1, 'day') },
                      { label: 'Next week', value: dayjs().add(1, 'week') },
                    ]}
                    format="YYYY-MM-DD"
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                    value={date ? dayjs(date) : undefined}
                    onChange={(date) => {
                      setDate(date?.format('YYYY-MM-DD') || '');
                      setSelectedTime('');
                    }}
                    size="large"
                  />
                </>
              )}
              {procedures.length > 0 && date && (
                <>
                  <StyledTitle level={2}>Select a time</StyledTitle>
                  <TimeTable
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    procedureId={procedures[0].id}
                    date={date}
                  />
                </>
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 8, offset: 2 }} xl={{ span: 4, offset: 1 }}>
          {procedures.length > 0 && date !== '' && selectedTime !== '' && (
            <>
              <StyledTitle level={2}>Summary</StyledTitle>
              <SubmitBox>
                <StyledParagraph>
                  <b>Doctor:</b> {doctors[0].first_name} {doctors[0].last_name}
                </StyledParagraph>
                <StyledParagraph>
                  <b>Procedure:</b> {procedures[0].name}
                </StyledParagraph>
                <StyledParagraph>
                  <b>Date:</b> {dayjs(date).format('D MMMM YYYY')} {selectedTime} -{' '}
                  {dayjs(selectedTime, 'HH:mm').add(procedures[0].needed_time_min, 'minute').format('HH:mm')}
                </StyledParagraph>
                <StyledButton type="primary" size="large">
                  Submit
                </StyledButton>
              </SubmitBox>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MakeAppointmentPage;
