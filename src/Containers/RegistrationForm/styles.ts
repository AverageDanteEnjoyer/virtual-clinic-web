import styled from 'styled-components';
import { Form } from 'antd';

import Button from '../../Components/Button';
import palette from '../../palette';

export const StyledButton = styled(Button)`
  margin-top: 75px;

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
