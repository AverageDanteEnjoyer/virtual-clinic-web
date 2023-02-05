import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { fetchAvailableAppointmentHours } from './fetchAvailableAppointmentHours';

interface RecordType {
  key: string;
  time_of_day: string;
  times: string[];
}

interface TimeTableProps {
  setSelectedTime: (time: string) => void;
  procedureId: number;
  date: string;
}

const categorizeData = (time: string): string => {
  const [hour, _] = time.split(':').map(Number);
  if (hour < 6) return 'Night';
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

const TimeTable = ({ setSelectedTime, procedureId, date }: TimeTableProps) => {
  const [data, setData] = useState<RecordType[]>([]);
  const [highlightedEntry, setHighlightedEntry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      key: 'time_of_day',
      title: 'Time of day',
      dataIndex: 'time_of_day',
    },
    {
      key: 'times',
      title: 'Times',
      dataIndex: 'times',
      render: (record: string[]) =>
        record.map((time, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: highlightedEntry === time ? '#1890ff' : 'white',
            }}
            onClick={() => {
              setHighlightedEntry(time);
              setSelectedTime(time);
            }}
          >
            {time}
          </div>
        )),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    const responseBody = await fetchAvailableAppointmentHours(date, procedureId);
    setLoading(false);
    if (responseBody.error) {
      console.log(responseBody.error);
      return;
    } else {
      const categorizedData: RecordType[] = [
        { key: 'morning', time_of_day: 'Morning', times: [] },
        { key: 'afternoon', time_of_day: 'Afternoon', times: [] },
        { key: 'evening', time_of_day: 'Evening', times: [] },
        { key: 'night', time_of_day: 'Night', times: [] },
      ];

      responseBody.data.forEach((time) => {
        const category = categorizeData(time);
        const timeOfDay = categorizedData.find((data) => data.time_of_day === category);
        timeOfDay?.times.push(time);
      });

      setData(categorizedData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, procedureId]);

  return <Table loading={loading} dataSource={data} columns={columns} pagination={false} />;
};

export default TimeTable;
