import {Form, Row} from 'antd';
import styled from 'styled-components';

import palette from 'palette';

import Button from 'Components/Button';

export const StyledButton = styled(Button)`
  margin-top: 20px;

  &.ant-btn {
    &.ant-btn-lg {
      min-width: 200px;
      padding: 27px;
    }
  }
`;

export const StyledForm = styled(Form)`
  &.ant-form label {
    font-size: 16px;
    font-weight: 400;
    color: ${palette.russianViolet};
  }
` as typeof Form;

export const CenteredRow = styled(Row)`
  display: flex;
  justify-content: center;
`;
