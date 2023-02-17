import { Table } from 'antd';
import styled from 'styled-components';

import palette from 'palette';

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: ${palette.ultraViolet};
    color: ${palette.white};
    text-align: center;
    font-size: 16px;
  }

  .ant-table-tbody > tr > td {
    text-align: center;

    &:first-child {
      font-weight: 600;
      color: ${palette.russianViolet};
    }
  }
` as typeof Table;
