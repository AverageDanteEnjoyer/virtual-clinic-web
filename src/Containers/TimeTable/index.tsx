import { Row, Col } from 'antd';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

import { Table, TimeOption } from './styles';
import { fetchAvailableAppointmentHours, Status } from './fetchAvailableAppointmentHours';
import dayjs from 'dayjs';

interface RecordType {
  key: string;
  time_of_day: string;
  times: string[];
}

const categorizeData = (time: string): string => {
  const [hour, _] = time.split(':').map(Number);
  if (hour < 6) return 'Night';
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

interface TimeTableProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  procedureId: number;
  date: string;
}

const TimeTable = ({ selectedTime, setSelectedTime, procedureId, date }: TimeTableProps) => {
  const [data, setData] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [noContentMessage, setNoContentMessage] = useState('The doctor is not working on this day');

  useEffect(() => {
    fetchData();
  }, [date, procedureId]);

  const columns = [
    {
      key: 'time_of_day',
      title: 'Time of day',
      dataIndex: 'time_of_day',
      width: 120,
    },
    {
      key: 'times',
      title: 'Times',
      dataIndex: 'times',
      render: (record: string[]) => {
        return (
          <Row gutter={[8, 8]}>
            {record.map((time) => (
              <Col key={time}>
                <TimeOption
                  highlighted={selectedTime === dayjs(time, 'HH:mm').format('h:mm A')}
                  onClick={() => setSelectedTime(dayjs(time, 'HH:mm').format('h:mm A'))}
                >
                  {dayjs(time, 'HH:mm').format('h:mm A')}
                </TimeOption>
              </Col>
            ))}
          </Row>
        );
      },
    },
  ];

  const fetchData = debounce(async () => {
    setSelectedTime('');

    setLoading(true);
    const { data, status } = await fetchAvailableAppointmentHours(date, procedureId);
    setLoading(false);

    switch (status) {
      case Status.ERROR:
        setData([]);
        setNoContentMessage('Something went wrong. Please try again later');
        break;

      case Status.NON_WORKING_DAY:
        setData([]);
        setNoContentMessage('The doctor is not working on this day');
        break;

      case Status.AVAILABLE: {
        const categorizedData: RecordType[] = [
          { key: 'morning', time_of_day: 'Morning', times: [] },
          { key: 'afternoon', time_of_day: 'Afternoon', times: [] },
          { key: 'evening', time_of_day: 'Evening', times: [] },
          { key: 'night', time_of_day: 'Night', times: [] },
        ];

        data.forEach((time) => {
          const category = categorizeData(time);
          const timeOfDay = categorizedData.find((data) => data.time_of_day === category);
          timeOfDay?.times.push(time);
        });

        setData(categorizedData.filter((data) => data.times.length > 0));

        if (data.length === 0) {
          setNoContentMessage('There are no available dates\nPlease choose a different day');
        }
      }
    }
  }, 275);

  return (
    <Table
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={false}
      locale={{
        emptyText: noContentMessage,
      }}
    />
  );
};

export default TimeTable;
