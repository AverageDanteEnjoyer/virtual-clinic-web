import Button from 'Components/Button';
import palette from 'palette';
import styled from 'styled-components';

export const EditButton = styled(Button)``;

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
