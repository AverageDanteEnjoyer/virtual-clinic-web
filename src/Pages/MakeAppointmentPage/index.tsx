import dayjs from 'dayjs';
import { Col, Row } from 'antd';
import { useContext, useState } from 'react';
import Duration from 'dayjs/plugin/duration';
import { useNavigate } from 'react-router-dom';
import RelativeTime from 'dayjs/plugin/relativeTime';

import routes from 'routes';
import { Store } from 'store';
import { getDurationFormatted } from 'helpers';
import pushNotification from 'pushNotification';

import useTitle from 'Hooks/useTitle';

import TimeTable from 'Containers/TimeTable';

import Spin from 'Components/Spin';
import Button from 'Components/Button';
import Navbar from 'Components/Navbar';
import PaginatedSelect from 'Components/PaginatedSelect';
import { Paragraph, Title } from 'Components/Typography';

import fetchProcedures from './fetchProcedures';
import makeAppointment from './makeAppointment';
import { OptionCol, MainText, Info, Panel, WideDatePicker, SubmitBox } from './styles';

dayjs.extend(Duration);
dayjs.extend(RelativeTime);

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
  const [timeTableState, setTimeTableState] = useState(Date.now());

  const onSubmit = async (procedureId: number) => {
    setLoading(true);
    try {
      const response = await makeAppointment(procedureId, date, selectedTime);
      if (response.ok) {
        pushNotification('success', 'Success', 'Appointment has been made');
        setTimeTableState(Date.now());
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

  const renderOption = ({ name, needed_time_min, doctor: { first_name, last_name } }: Procedure) => {
    const hours = dayjs.duration(needed_time_min, 'minutes').hours();
    const minutes = dayjs.duration(needed_time_min, 'minutes').minutes();

    return (
      <Row>
        <OptionCol>
          <MainText>{name}</MainText>
          <Info>
            Doctor: {first_name} {last_name} | {getDurationFormatted(hours, minutes)}
          </Info>
        </OptionCol>
      </Row>
    );
  };

  const selectProcedure = (
    <>
      <Title level={2}>Select a procedure</Title>
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
    </>
  );

  const selectDate = procedures.length > 0 && (
    <>
      <Title level={2}>Select a date</Title>
      <WideDatePicker
        presets={[
          { label: 'Today', value: dayjs() },
          { label: 'Tomorrow', value: dayjs().add(1, 'day') },
          { label: 'Next week', value: dayjs().add(1, 'week') },
        ]}
        format="MM-DD-YYYY"
        disabledDate={(current) => current && current < dayjs().startOf('day')}
        value={date ? dayjs(date) : undefined}
        onChange={(date) => {
          setDate(date?.format('YYYY-MM-DD') || '');
          setSelectedTime('');
        }}
        size="large"
      />
    </>
  );

  const selectTime = procedures.length > 0 && date && (
    <>
      <Title level={2}>Select a time</Title>
      <TimeTable
        key={timeTableState}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        procedureId={procedures[0].id}
        date={date}
      />
    </>
  );

  const submitBox = procedures.length > 0 && date !== '' && selectedTime !== '' && (
    <Row justify="center" align="middle">
      <Panel span={22}>
        <Title level={2}>Summary</Title>
        <SubmitBox>
          <Paragraph>
            <b>Doctor:</b> {procedures[0].doctor.first_name} {procedures[0].doctor.last_name}
          </Paragraph>
          <Paragraph>
            <b>Procedure:</b> {procedures[0].name}
          </Paragraph>
          <Paragraph>
            <b>Date:</b> {dayjs(date).format('D MMMM YYYY')} {selectedTime} -{' '}
            {dayjs(selectedTime, 'HH:mm').add(procedures[0].needed_time_min, 'minute').format('h:mm A')}
          </Paragraph>
          <Button
            size="large"
            disabled={dayjs(selectedTime, 'HH:mm').isBefore(dayjs()) && dayjs(date).isSame(dayjs(), 'day')}
            onClick={() => onSubmit(procedures[0].id)}
            loading={loading}
          >
            Submit
          </Button>
        </SubmitBox>
      </Panel>
    </Row>
  );

  return (
    <Spin spinning={loading} tip="waiting for server response...">
      <Navbar />
      <Title centered>Make an appointment</Title>
      <Row gutter={[0, 15]} justify="center">
        <Col xs={{ span: 24 }} md={{ span: 13 }} xl={{ span: 9 }}>
          <Row justify="center" align="middle">
            <Panel span={22}>
              {selectProcedure}
              {selectDate}
              {selectTime}
            </Panel>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }} xl={{ span: 6 }}>
          {submitBox}
        </Col>
      </Row>
    </Spin>
  );
};

export default MakeAppointmentPage;
