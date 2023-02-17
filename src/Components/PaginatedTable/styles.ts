import styled from 'styled-components';
import { Input as InputAntd, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import palette from 'palette';

export const FilterDropdown = styled.div`
  padding: 8px;
`;

export const Input = styled(InputAntd)`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
  width: 200px;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const SearchIcon = styled(SearchOutlined)`
  color: ${palette.white};
  font-size: 16px;
`;

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
