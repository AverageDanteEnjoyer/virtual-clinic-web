import styled from 'styled-components';
import { Radio } from 'antd';

import palette from '../../palette';

export const StyledRadio = styled(Radio)`
  line-height: 2;

  &.ant-radio-input:focus-visible {
    box-shadow: none;
  }

  &.ant-radio {
    color: ${palette.russianViolet};
  }

  &.ant-radio-wrapper:hover .ant-radio-inner {
    border-color: ${palette.russianViolet};
  }

  &.ant-radio-wrapper-checked .ant-radio-inner {
    border-color: ${palette.russianViolet};
    background-color: ${palette.russianViolet};
    height: 20px;
    width: 20px;
  }
`;
