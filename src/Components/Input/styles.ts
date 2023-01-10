import styled, { css } from 'styled-components';
import { Input } from 'antd';

const styles = css`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
`;

export const StyledInput = styled(Input)`
  ${styles};
  font-size: 16px;
`;

export const StyledInputPassword = styled(Input.Password)`
  ${styles};
  font-size: 16px;
`;

export const StyledTableInput = styled(Input)`
  ${styles};
  width: 200px;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;
