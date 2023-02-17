import { Col, Row, Space } from 'antd';
import styled from 'styled-components';

import { Paragraph, Title } from 'Components/Typography';
import palette from 'palette';

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

export const Panel = styled(Col)`
  width: min(700px, 90vw);
`;

export const CardRow = styled(Row)`
  background-color: ${palette.whiteSmoke};
  border-radius: 15px;
  padding: 30px 0;
  margin: 30px 0;
`;

export const CardTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 32px;
    color: ${palette.russianViolet};
  }
`;

export const Note = styled(Paragraph)`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: ${palette.russianViolet};
`;

export const Divider = styled(Space)`
  width: 100%;
`;
