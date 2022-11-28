import React from 'react';
import { InputProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { StyledInput, StyledInputPassword } from './styles';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const CustomInput = ({ prefix = <UserOutlined />, password = false, size, placeholder }: StyledInputProps) => {
  return password ? (
    <StyledInputPassword size={size} placeholder={placeholder} prefix={<LockOutlined />} />
  ) : (
    <StyledInput size={size} placeholder={placeholder} prefix={prefix} />
  );
};

export default CustomInput;
