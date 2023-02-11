import styled, { css } from 'styled-components';
import { Input } from 'antd';

import palette from 'palette';

const styles = css`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
  font-size: 16px;

  &.ant-input-affix-wrapper:hover,
  &.ant-input-affix-wrapper:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: ${palette.russianViolet};
  }
`;

export const StyledInput = styled(Input)`
  ${styles};
`;

export const StyledInputPassword = styled(Input.Password)`
  ${styles};
`;
