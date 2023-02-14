import styled from 'styled-components';
import { Col } from 'antd';

import palette from 'palette';

export const OptionCol = styled(Col)`
  margin-left: 8px;
`;

export const MainText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  height: 18px;
  width: 100%;
  line-height: 20px;
  color: ${palette.deepViolet};
`;

export const Info = styled(MainText)`
  font-size: 14px;
  font-weight: 400;
  height: 16px;
  width: 100%;
  color: ${palette.sonicSilver};
`;
