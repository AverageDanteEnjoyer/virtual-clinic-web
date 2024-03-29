import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useEffect, useState } from 'react';
import { capitalize } from 'lodash';
import { Col, Row } from 'antd';
import moment from 'moment';

import pushNotification from 'pushNotification';
import { getAccountId } from 'localStorageAPI';
import { Title } from 'Components/Typography';
import Navbar from 'Components/Navbar';
import useTitle from 'Hooks/useTitle';
import Spin from 'Components/Spin';

import createWorkPlan, { CreateWorkPlanProps } from './createWorkPlan';
import WorkPlanType, { daysOfWeek } from './workPlanType';
import fetchWorkPlans from './fetchWorkPlans';
import deleteWorkPlan from './deleteWorkPlan';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarContainer, PanelCol } from './styles';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const WorkPlanPage = () => {
  useTitle();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchWorkPlan();
  }, []);

  const fetchWorkPlan = async () => {
    setLoading(true);
    try {
      const doctorId = getAccountId();
      const { data, error } = await fetchWorkPlans(doctorId);

      if (error) {
        pushNotification('error', 'Something went wrong', 'Please try again later');
      } else {
        const newEvents = data.map((workPlan: WorkPlanType) => {
          const { id, day_of_week, work_hour_start, work_hour_end } = workPlan;

          return {
            id,
            title: '',
            start: new Date(2023, 0, daysOfWeek.indexOf(day_of_week) + 1, work_hour_start),
            end: new Date(2023, 0, daysOfWeek.indexOf(day_of_week) + 1, work_hour_end),
          };
        });
        setEvents(newEvents);
      }
    } catch {
      pushNotification('error', 'Something went wrong', 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  const CustomToolbar = () => {
    return <div style={{ display: 'none' }} />;
  };

  const handleSelectEvent = async (event: Event) => {
    if (window.confirm('Are you sure you want to delete this work plan?')) {
      await deleteWorkPlan(event.id);
      await fetchWorkPlan();
    }
  };

  const handleSelectSlot = async ({ start, end }: { start: Date; end: Date }) => {
    setLoading(true);
    try {
      const workPlan: CreateWorkPlanProps = {
        day_of_week: daysOfWeek[start.getDay()],
        work_hour_start: start.getHours(),
        work_hour_end: end.getHours(),
      };

      const response = await createWorkPlan(workPlan);
      const data = await response.json();

      if (response.ok) {
        await fetchWorkPlan();
        pushNotification('success', 'Success', 'Work plan has been created');
      } else {
        const errors: { [key: string]: string[] } = data.errors;
        Object.entries(errors).forEach(([key, messages]) => {
          const description = `${capitalize(key.replaceAll('_', ' '))} ${messages.join(', ')}.`;
          pushNotification('error', 'Something went wrong', description);
        });
      }
    } catch {
      pushNotification('error', 'Something went wrong', 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Title centered>Work plan</Title>
      <Row>
        <PanelCol xs={{ span: 22, offset: 1 }} lg={{ span: 16, offset: 4 }} xl={{ span: 12, offset: 6 }}>
          <Row>
            <Col span={22} offset={1}>
              <Title centered level={2}>
                Work plan schedule
              </Title>
              <CalendarContainer>
                <Spin spinning={loading}>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    defaultView={Views.WEEK}
                    views={['week']}
                    step={60}
                    timeslots={1}
                    defaultDate={new Date(2023, 0, 1)}
                    components={{ toolbar: CustomToolbar }}
                    showMultiDayTimes={false}
                    formats={{
                      dayFormat: (date, culture, localizer) => localizer?.format(date, 'dddd', culture) ?? '',
                    }}
                    selectable
                  />
                </Spin>
              </CalendarContainer>
            </Col>
          </Row>
        </PanelCol>
      </Row>
    </>
  );
};

export default WorkPlanPage;
