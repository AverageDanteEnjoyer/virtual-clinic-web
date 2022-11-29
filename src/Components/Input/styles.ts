import styled, { css } from 'styled-components';
import { Input } from 'antd';

const Styles = css`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
  font-size: 16px;
  width: 20%;
`;

export const StyledInput = styled(Input)`
  ${Styles}
`;

export const StyledInputPassword = styled(Input.Password)`
  ${Styles}
`;
