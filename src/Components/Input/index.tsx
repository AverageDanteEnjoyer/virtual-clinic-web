import React from 'react';
import { InputProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { StyledInput, StyledInputPassword } from './styles';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const Input = ({
  prefix = <UserOutlined />,
  password = false,
  size,
  placeholder,
  type,
  onChange,
}: StyledInputProps) => {
  return password ? (
    <StyledInputPassword size={size} placeholder={placeholder} prefix={<LockOutlined />} />
  ) : (
    <StyledInput size={size} placeholder={placeholder} prefix={prefix} type={type} onChange={onChange} />
  );
};

export default Input;
