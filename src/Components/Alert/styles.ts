import styled, { css } from 'styled-components';
import { Alert } from 'antd';

import colors from '../../palette';

export const StyledAlert = styled(Alert)`
  ${({ type }) =>
    type === 'info' &&
    css`
      background-color: ${colors.dodgerBlue};
      background-image: ${colors.dodgerBlueGradient};
      font-family: CircularStd, sans-serif;
      font-size: 16px;
      padding: 6px;
      border-radius: 20px;
      color: ${colors.white};
    `}
`;