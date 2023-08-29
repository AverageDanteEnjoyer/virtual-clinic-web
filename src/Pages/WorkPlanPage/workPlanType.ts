export const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export type DayOfWeek = typeof daysOfWeek[number];

type WorkPlan = {
  id: number;
  day_of_week: DayOfWeek;
  work_hour_start: number;
  work_hour_end: number;
};

export default WorkPlan;
