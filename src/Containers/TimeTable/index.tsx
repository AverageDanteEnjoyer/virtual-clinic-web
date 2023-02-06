import { useState, useEffect } from 'react';
import { message, Row, Table, Col } from 'antd';
import { fetchAvailableAppointmentHours, Status } from './fetchAvailableAppointmentHours';
import { TimeOption } from './styles';

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
          <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
            {record.map((time) => (
              <Col span={8} key={time} flex={'1 1 min-content'}>
                <TimeOption highlighted={selectedTime === time} onClick={() => setSelectedTime(time)}>
                  {time}
                </TimeOption>
              </Col>
            ))}
          </Row>
        );
      },
    },
  ];

  const fetchData = async () => {
    setSelectedTime('');

    setLoading(true);
    const { data, status } = await fetchAvailableAppointmentHours(date, procedureId);
    setLoading(false);

    switch (status) {
      case Status.ERROR:
        setData([]);
        message.error('Something went wrong. Please try again later.');
        break;

      case Status.NON_WORKING_DAY:
        setData([]);
        message.info('The doctor is not working on this day.');
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
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, procedureId]);

  return (
    <Table
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={false}
      locale={{
        emptyText: 'There are no available dates\nPlease choose a different day',
      }}
    />
  );
};

export default TimeTable;
