import styled from 'styled-components';
import { Input } from 'antd';

const Styles = `border-radius: 20px;
                font-family: CircularStd, sans-serif;
                font-size: 16px;
                width: 20%;`;

const StyledInput = styled(Input)`
  ${Styles}
`;

const StyledInputPassword = styled(Input.Password)`
  ${Styles}
`;

export { StyledInput, StyledInputPassword };
