import React from 'react';
import { Input, InputProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const StyledInput = ({ prefix = <UserOutlined />, password = false, size, placeholder }: StyledInputProps) => {
  return password ? (
    <Input.Password size={size} placeholder={placeholder} prefix={<LockOutlined />} />
  ) : (
    <Input size={size} placeholder={placeholder} prefix={prefix} />
  );
};

export default StyledInput;
