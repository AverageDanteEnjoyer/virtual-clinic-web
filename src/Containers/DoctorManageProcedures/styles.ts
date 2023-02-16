import styled from 'styled-components';

import Button from 'Components/Button';
import palette from 'palette';

const DeleteButton = styled(Button)`
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
}
`;

export default DeleteButton;
