import styled, { css } from 'styled-components';
import { Input } from 'antd';

const styles = css`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
  font-size: 16px;
`;

export const StyledInput = styled(Input)`
  ${styles}
`;

export const StyledInputPassword = styled(Input.Password)`
  ${styles}
`;
