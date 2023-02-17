import { InputProps } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import { StyledInput, StyledInputPassword } from './styles';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const Input = ({ password = false, ...rest }: StyledInputProps) => {
  return password ? (
    <StyledInputPassword {...rest} type="password" prefix={<LockOutlined />} />
  ) : (
    <StyledInput {...rest} />
  );
};

export default Input;
