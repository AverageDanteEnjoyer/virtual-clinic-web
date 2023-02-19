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
  width: 100%;

  color: ${palette.russianViolet};

  &:hover,
  &:focus {
    border-color: ${palette.tekhelet};
  }

  .ant-picker-active-bar {
    background-color: ${palette.ultraViolet};
  }

  &.ant-picker-focused {
    border-color: ${palette.tekhelet};
  }

  .ant-picker-input input {
    color: ${palette.russianViolet};
    font-size: 16px;
  }
`;
