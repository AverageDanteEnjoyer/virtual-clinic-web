import { useContext, useEffect, useState } from 'react';
import { Col, DatePicker, Row, Table } from 'antd';
import dayjs from 'dayjs';

import Navbar from '../../Components/Navbar';
import { StyledTitle } from '../../Components/Typography/styles';
import { TitleContext } from '../../Contexts/TitleContext';
import PaginatedSelect from '../../Components/PaginatedSelect';
import fetchAllDoctors from './fetchDoctors';
import { DoctorEmail, DoctorIcon, DoctorInfo, DoctorOption, Paragraph } from './styles';
import { getFetchDoctorProcedures } from './fetchDoctorProcedures';

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

const timeTableColumns = [
  {
    key: 'time_of_day',
    title: 'Time of day',
    dataIndex: 'time_of_day',
  },
  {
    key: 'times',
    title: 'Times',
    dataIndex: 'times',
    render: (record: string[]) => record.join(', '),
  },
];

const mockData = {
  data: [
    '5:40',
    '10:20',
    '10:40',
    '11:00',
    '11:20',
    '11:40',
    '12:00',
    '12:20',
    '12:40',
    '13:00',
    '13:20',
    '13:40',
    '14:00',
    '14:20',
    '14:40',
    '15:00',
    '15:20',
    '15:40',
    '16:00',
    '16:20',
    '16:40',
    '17:00',
    '18:00',
    '22:00',
  ],
};

const MakeAppointmentPage = () => {
  const { updateTitle } = useContext(TitleContext);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    updateTitle('Make an appointment');
  }, [updateTitle]);

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

  const categorizeData = (time: string): string => {
    const [hour, _] = time.split(':').map(Number);
    if (hour < 6) return 'Night';
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  const categorizedData: { time_of_day: string; times: string[] }[] = [
    { time_of_day: 'Morning', times: [] },
    { time_of_day: 'Afternoon', times: [] },
    { time_of_day: 'Evening', times: [] },
    { time_of_day: 'Night', times: [] },
  ];

  mockData.data.forEach((time) => {
    const timeOfDay = categorizeData(time);
    const existingTimeOfDay = categorizedData.find((data) => data.time_of_day === timeOfDay);
    if (existingTimeOfDay) {
      existingTimeOfDay.times.push(time);
    } else {
      categorizedData.push({ time_of_day: timeOfDay, times: [time] });
    }
  });

  return (
    <>
      <Navbar />
      <Row>
        <Col span={8} offset={8}>
          <StyledTitle>Make an appointment</StyledTitle>
          <p>Choose a doctor</p>
          <PaginatedSelect<Doctor>
            size="large"
            fetchOptions={fetchAllDoctors}
            values={doctors}
            setValues={(values: Doctor[]) => {
              setDoctors(values);
              setProcedures([]);
              setDate(dayjs().format('YYYY-MM-DD'));
            }}
            renderOption={renderOption}
            placeholder="Search for a doctor"
            notFoundContent={(searchValue) => <p>No doctors found for {searchValue}</p>}
          />
          {doctors.length > 0 && (
            <>
              <p>Choose a procedure</p>
              <PaginatedSelect<Procedure>
                size="large"
                fetchOptions={getFetchDoctorProcedures(doctors[0].id)}
                values={procedures}
                setValues={(values: Procedure[]) => {
                  setProcedures(values);
                  setDate(dayjs().format('YYYY-MM-DD'));
                }}
                renderOption={(procedure) => <>{procedure.name}</>}
                placeholder="Search for a procedure"
                notFoundContent={(searchValue) => <p>No procedures found for {searchValue}</p>}
              />
            </>
          )}
          {procedures.length > 0 && (
            <>
              <p>Choose a date</p>
              <DatePicker
                presets={[
                  { label: 'Today', value: dayjs() },
                  { label: 'Tomorrow', value: dayjs().add(1, 'day') },
                  { label: 'Next week', value: dayjs().add(1, 'week') },
                ]}
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current < dayjs().startOf('day')}
                value={date ? dayjs(date) : dayjs()}
                onChange={(date) => setDate(date?.format('YYYY-MM-DD') || '')}
              />
            </>
          )}
          {procedures.length > 0 && date && (
            <>
              <p>Available times</p>
              <Table dataSource={categorizedData} columns={timeTableColumns} />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MakeAppointmentPage;
