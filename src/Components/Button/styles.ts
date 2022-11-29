import styled from 'styled-components';
import { Button } from 'antd';

import colors from '../../palette';

export const StyledButton = styled(Button)`
  background-color: ${colors.dodgerBlue};
  background-image: ${colors.dodgerBlueGradient};
  background-size: calc(100% + 20px) calc(100% + 20px);
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd, sans-serif;
  font-size: 16px;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  transition: background-color 0.2s, background-position 0.2s;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    background-position: -20px -20px;
  }

  &:focus:not(:active) {
    box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 0.125em;
  }
`;
