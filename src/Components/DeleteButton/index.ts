import { Form } from 'antd';
import styled from 'styled-components';

import Button from 'Components/Button';
import palette from 'palette';

export const DeleteButton = styled(Button)`
  background-color: ${palette.sovietRussia};
  border-color: ${palette.sovietRussia};

  &.ant-btn-primary {
    &:hover,
    &:focus,
    &:active {
      background-color: ${palette.sweetCandiedApple};
      border-color: ${palette.sweetCandiedApple};
    }

    &:focus-visible {
      outline: none;
    }
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 100%;
`;

export const SubmitButton = styled(Button)`
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
