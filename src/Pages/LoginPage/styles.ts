import styled from 'styled-components';
import { Row, Col } from 'antd';

import palette from 'palette';

import Button from 'Components/Button';
import { Paragraph, Title } from 'Components/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const FullHeightRow = styled(Row)`
  height: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

export const EndCol = styled(Col)`
  display: flex;
  align-items: flex-end;
`;

export const Panel = styled(Col)`
  height: 450px;
  max-width: min(555px, 90vw);
  margin-bottom: 30px;
`;

export const CardRow = styled(Row)`
  height: 100%;
  background-color: ${palette.whiteSmoke};
  border-radius: 15px;
  padding: 30px 0;
  margin: 30px 0;
`;

export const StyledButton = styled(Button)`
  &.ant-btn {
    &.ant-btn-lg {
      min-width: 200px;
      padding: 27px;
      margin-bottom: 10px;
    }
  }
`;

export const Note = styled(Paragraph)`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: ${palette.russianViolet};
`;

export const CardTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 32px;
    color: ${palette.russianViolet};
  }
`;
