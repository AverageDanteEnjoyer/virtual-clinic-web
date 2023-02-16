import styled from 'styled-components';
import { Col, DatePicker } from 'antd';

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

export const Panel = styled(Col)`
  background-color: ${palette.whiteSmoke};
  border-radius: 15px;
  padding: 0 30px 30px;
  height: 100%;
`;

export const WideDatePicker = styled(DatePicker)`
  width: 100%;

  &:hover {
    border-color: ${palette.ultraViolet};
  }

  &.ant-picker-focused {
    border-color: ${palette.ultraViolet};
  }
`;

export const SubmitBox = styled.div`
  border-radius: 20px;
  background-color: ${palette.veryLightGray};
  padding: 24px 40px;
`;
