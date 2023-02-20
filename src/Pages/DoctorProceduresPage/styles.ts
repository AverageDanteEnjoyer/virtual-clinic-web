import { Col } from 'antd';
import styled from 'styled-components';

import palette from 'palette';

export const PanelCol = styled(Col)`
  background-color: ${palette.whiteSmoke};
  border-radius: 10px;
  padding-bottom: 50px;

  &:last-of-type {
    margin-bottom: 50px;
  }
`;
