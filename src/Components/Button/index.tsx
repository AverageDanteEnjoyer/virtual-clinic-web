import { ButtonProps } from 'antd';

import { StyledButton } from './styles';

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
