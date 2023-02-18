import styled from 'styled-components';
import { Select } from 'antd';

import palette from 'palette';

export const StyledSelect = styled(Select)`
  border-radius: 20px;
  width: 100%;
  font-family: CircularStd, sans-serif;
  font-size: 16px;

  .ant-select-selector {
    border-radius: 20px;
    color: ${palette.ultraViolet};
  }

  .ant-select-selection-item {
    border-radius: 20px;
  }
`;
