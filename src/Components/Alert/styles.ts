import styled, { css } from 'styled-components';
import { Alert } from 'antd';

import palette from 'palette';

export const StyledAlert = styled(Alert)`
  ${({ type }) =>
    type === 'info' &&
    css`
      background-color: ${palette.dodgerBlue};
      background-image: ${palette.dodgerBlueGradient};
      font-family: CircularStd, sans-serif;
      font-size: 16px;
      padding: 6px;
      border-radius: 20px;
      color: ${palette.white};

      .anticon {
        color: ${palette.white};
      }
    `}
`;
