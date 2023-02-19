import styled from 'styled-components';
import { TimePicker } from 'antd';

import Button from 'Components/Button';
import palette from 'palette';

export const EditButton = styled(Button)``;

export const DeleteButton = styled(Button)`
  background-color: ${palette.sovietRussia};
  border-color: ${palette.sovietRussia};

  &.ant-btn-primary {
    &:hover,
    &:focus,
    &:active {
      background-color: ${palette.sweetCandiedApple};
      border-color: ${palette.sweetCandiedApple};
    }

    &:focus-visible {
      outline: none;
    }
  }
`;

export const TimePickerRange = styled(TimePicker.RangePicker)`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
  font-size: 16px;
  width: 100%;

  &:hover,
  &:focus {
    border-color: ${palette.ultraViolet};
  }

  .ant-picker-active-bar {
    background-color: ${palette.ultraViolet};
  }
`;
