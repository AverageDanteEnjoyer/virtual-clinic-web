import styled from 'styled-components';
import { Row, Col } from 'antd';

import Button from '../../Components/Button';
import palette from '../../palette';
import { StyledParagraph, StyledTitle } from '../../Components/Typography/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const FullHeightRow = styled(Row)`
  height: 100%;
  max-width: 100vw;
`;

export const EndCol = styled(Col)`
  display: flex;
  align-items: flex-end;
`;

export const Panel = styled(Col)`
  height: 450px;
  max-width: min(555px, 90vw);
`;

export const CardRow = styled(Row)`
  height: 100%;
  background-color: ${palette.whiteSmoke};
  border-radius: 15px;
`;

export const StyledButton = styled(Button)`
  &.ant-btn {
    &.ant-btn-lg {
      min-width: 200px;
      padding: 27px;
      margin-bottom: 45px;
    }
  }
`;

export const Note = styled(StyledParagraph)`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: ${palette.russianViolet};
`;

export const CardTitle = styled(StyledTitle)`
  &.ant-typography {
    text-align: center;
    font-size: 32px;
    color: ${palette.russianViolet};
  }
`;
