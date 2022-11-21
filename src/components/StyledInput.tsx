import React from 'react';
import { Input, InputProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const StyledInput: React.FC<StyledInputProps> = ({ size, placeholder, prefix, password }: StyledInputProps) => {
  const DefaultInput = <Input size={size} placeholder={placeholder} prefix={prefix} />;

  const PasswordInput = <Input.Password size={size} placeholder="password" prefix={<LockOutlined />} />;

  return password ? PasswordInput : DefaultInput;
};

StyledInput.defaultProps = {
  size: 'middle',
  placeholder: ' ',
  prefix: <UserOutlined />,
  password: true,
};

export default StyledInput;
