import { Form } from 'antd';
import Button from 'Components/Button';
import palette from 'palette';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  &.ant-form label {
    font-size: 16px;
    font-weight: 400;
    color: ${palette.russianViolet};
  }
` as typeof Form;

export const SubmitButton = styled(Button)`
  margin-top: 20px;

  &.ant-btn {
    &.ant-btn-lg {
      min-width: 200px;
      padding: 27px;
    }
  }
`;
