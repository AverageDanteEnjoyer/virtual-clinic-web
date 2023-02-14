import { Col, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { Store } from 'store';
import routes from 'routes';
import useTitle from 'useTitle';
import pushNotification from 'pushNotification';
import TimeTable from 'Containers/TimeTable';
import { SubmitBox } from 'Containers/TimeTable/styles';
import Navbar from 'Components/Navbar';
import { StyledParagraph, StyledTitle } from 'Components/Typography/styles';
import PaginatedSelect from 'Components/PaginatedSelect';
import Button from 'Components/Button';
import Spin from 'Components/Spin';
import { OptionCol, MainText, Info, Panel, WideDatePicker } from './styles';
import fetchProcedures from './fetchProcedures';
import makeAppointment from './makeAppointment';

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
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const onSubmit = async (procedure: Procedure) => {
    setLoading(true);
    try {
      const response = await makeAppointment(procedure, date, selectedTime);
      if (response.ok) {
        pushNotification(
          'success',
          'Appointment created',
          'You have been scheduled for an appointment. Redirecting to your appointments...'
        );

        setTimeoutId(
          setTimeout(() => {
            navigate(routes.home.path); // TODO: change to appointments page.
          }, 3000)
        );
      } else {
        pushNotification('error', 'Something went wrong', 'Please try again later');
      }
    } catch {
      dispatch({ type: 'logout' });
      navigate(routes.logIn.path);
    } finally {
      setLoading(false);
    }
  };

  const renderOption = ({ name, needed_time_min, doctor: { first_name, last_name } }: Procedure) => (
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
    <Spin spinning={loading} tip="waiting for server response...">
      <Navbar />
      <StyledTitle center="true">Make an appointment</StyledTitle>
      <Row gutter={[0, 15]} justify="center">
        <Col xs={{ span: 24 }} md={{ span: 13 }} xl={{ span: 9 }}>
          <Row justify="center" align="middle">
            <Panel span={22}>
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
            </Panel>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }} xl={{ span: 6 }}>
          {procedures.length > 0 && date !== '' && selectedTime !== '' && (
            <Row justify="center" align="middle">
              <Panel span={22}>
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
                    onClick={() => onSubmit(procedures[0])}
                  >
                    Submit
                  </Button>
                </SubmitBox>
              </Panel>
            </Row>
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default MakeAppointmentPage;
