import { Divider, Pagination } from 'antd';
import styled from 'styled-components';

import palette from 'palette';
import Select from 'Components/Select';

export const PaginationFrame = styled.div`
  text-align: center;
`;

export const StyledDivider = styled(Divider)`
  margin: 4px 0;
`;

export const StyledSelect = styled(Select)`
  width: 100%;

  &.ant-select:hover .ant-select-selector {
    border-color: ${palette.russianViolet} !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: ${palette.tekhelet} !important;
  }
`;

export const StyledPagination = styled(Pagination)`
  &.ant-pagination {
    color: ${palette.russianViolet};
  }

  .ant-pagination-item-active {
    border-color: ${palette.tekhelet};

    a {
      color: ${palette.tekhelet};
    }

    &:hover {
      border-color: ${palette.russianViolet};

      a {
        color: ${palette.russianViolet};
      }
    }
  }
`;
