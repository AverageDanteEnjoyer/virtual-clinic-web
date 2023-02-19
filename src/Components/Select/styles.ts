import { Select } from 'antd';
import styled from 'styled-components';

import palette from 'palette';

export const StyledSelect = styled(Select)`
  width: 100%;
  font-family: CircularStd, sans-serif;
  border-radius: 20px;

  &.ant-select:hover .ant-select-selector {
    border-color: ${palette.russianViolet} !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: ${palette.tekhelet} !important;
  }

  .ant-select-selector {
    border-radius: 20px;
    color: ${palette.russianViolet};
  }

  .ant-select-selection-item {
    border-radius: 20px;
    font-size: 16px;
  }
`;
