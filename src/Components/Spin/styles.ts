import { Spin } from 'antd';
import styled from 'styled-components';

import palette from 'palette';

export const StyledSpin = styled(Spin)`
  .anticon.ant-spin-dot {
    font-size: 24px;
    color: ${palette.ultraViolet};
  }

  .ant-spin-text {
    font-size: 16px;
    color: ${palette.ultraViolet};
  }
`;
