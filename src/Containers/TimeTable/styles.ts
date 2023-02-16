import styled from 'styled-components';
import { Table as TableAntd } from 'antd';

import palette from 'palette';

export const TimeOption = styled.div<{ highlighted: boolean }>`
  cursor: pointer;
  height: 100%;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.russianViolet};

  border-radius: 5px;

  background-color: ${palette.white};
  outline: ${({ highlighted }) => (highlighted ? `1px solid ${palette.tekhelet}` : 'none')};

  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${palette.veryLightGray};
  }
`;

export const Table = styled(TableAntd)`
  .ant-table-thead > tr > th {
    background-color: ${palette.ultraViolet};
    color: ${palette.white};
    text-align: center;
    font-size: 16px;
  }

  .ant-table-tbody > tr > td:first-child {
    text-align: center;
    font-weight: 600;
    color: ${palette.russianViolet};
  }
`;
