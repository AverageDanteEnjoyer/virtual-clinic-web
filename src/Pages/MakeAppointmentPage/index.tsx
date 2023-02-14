import { useState } from 'react';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';

import useTitle from 'useTitle';
import TimeTable from 'Containers/TimeTable';
import { SubmitBox } from 'Containers/TimeTable/styles';
import Navbar from 'Components/Navbar';
import { StyledParagraph, StyledTitle } from 'Components/Typography/styles';
import PaginatedSelect from 'Components/PaginatedSelect';
import Button from 'Components/Button';
import { OptionCol, MainText, Info, Panel, WideDatePicker } from './styles';
import fetchProcedures from './fetchProcedures';

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
  doctor: Doctor;
}

const MakeAppointmentPage = () => {
  useTitle();

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('');

  const renderOption = ({ name, needed_time_min, doctor: { first_name, last_name, email } }: Procedure) => (
    <Row>
      <OptionCol>
        <MainText>{name}</MainText>
        <Info>
          {needed_time_min} minutes | Doctor: {first_name} {last_name}
        </Info>
      </OptionCol>
    </Row>
  );

  return (
    <>
      <Navbar />
      <StyledTitle center="true">Make an appointment</StyledTitle>
      <Row>
        <Panel xs={{ span: 22, offset: 1 }} md={{ span: 13, offset: 1 }} xl={{ span: 9, offset: 4 }}>
          <Row>
            <Col span={22} offset={1}>
              <StyledTitle level={2}>Select a procedure</StyledTitle>
              <PaginatedSelect<Procedure>
                size="large"
                fetchOptions={fetchProcedures}
                values={procedures}
                setValues={(values: Procedure[]) => {
                  setProcedures(values);
                  setDate(dayjs().format('YYYY-MM-DD'));
                  setSelectedTime('');
                }}
                renderOption={renderOption}
                placeholder="Search for a procedure"
                notFoundContent={(searchValue) => <p>No procedures found for {searchValue}</p>}
              />
              {procedures.length > 0 && (
                <>
                  <StyledTitle level={2}>Select a date</StyledTitle>
                  <WideDatePicker
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
        </Panel>
        {procedures.length > 0 && date !== '' && selectedTime !== '' && (
          <Panel xs={{ span: 22, offset: 1 }} md={{ span: 8, offset: 1 }} xl={{ span: 6, offset: 1 }}>
            <Row>
              <Col span={22} offset={1}>
                <StyledTitle level={2}>Summary</StyledTitle>
                <SubmitBox>
                  <StyledParagraph>
                    <b>Doctor:</b> {procedures[0].doctor.first_name} {procedures[0].doctor.last_name}
                  </StyledParagraph>
                  <StyledParagraph>
                    <b>Procedure:</b> {procedures[0].name}
                  </StyledParagraph>
                  <StyledParagraph>
                    <b>Date:</b> {dayjs(date).format('D MMMM YYYY')} {selectedTime} -{' '}
                    {dayjs(selectedTime, 'HH:mm').add(procedures[0].needed_time_min, 'minute').format('HH:mm')}
                  </StyledParagraph>
                  <Button
                    size="large"
                    disabled={dayjs(selectedTime, 'HH:mm').isBefore(dayjs()) && dayjs(date).isSame(dayjs(), 'day')}
                  >
                    Submit
                  </Button>
                </SubmitBox>
              </Col>
            </Row>
          </Panel>
        )}
      </Row>
    </>
  );
};

export default MakeAppointmentPage;
