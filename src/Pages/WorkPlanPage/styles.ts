import { Col } from 'antd';
import styled from 'styled-components';

import palette from 'palette';

export const PanelCol = styled(Col)`
  background-color: ${palette.whiteSmoke};
  border-radius: 10px;
  padding-bottom: 50px;

  &:last-of-type {
    margin-bottom: 50px;
  }
`;

export const CalendarContainer = styled.div`
  .rbc-allday-cell {
    display: none !important;
  }

  .rbc-event {
    background-color: ${palette.ultraViolet};
    border: 1px solid ${palette.tekhelet};
  }

  .rbc-event-label {
    // wrap
    white-space: normal;
    word-break: break-word;
  }
`;
