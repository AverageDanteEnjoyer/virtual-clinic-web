import styled from 'styled-components';
import { Select } from 'antd';

import colors from '../../palette';

export const StyledSelect = styled(Select)`
  border-radius: 20px;
  width: 50%;
  font-family: CircularStd, sans-serif;
  font-size: 16px;

  .ant-select-selector {
    border-radius: 20px;
    color: ${colors.dodgerBlue};
  }

  .ant-select-selection-item {
    border-radius: 20px;
  }
`;
