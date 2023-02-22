import styled from 'styled-components';
import { Col } from 'antd';

import palette from 'palette';

import Button from 'Components/Button';

export const PanelCol = styled(Col)`
  background-color: ${palette.whiteSmoke};
  border-radius: 10px;
  padding: 40px 0 40px 40px;
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 100%;
  margin-top: 25px;
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
