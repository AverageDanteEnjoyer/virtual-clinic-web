import React from 'react';
import { Input, InputProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const StyledInput = ({
  prefix = <UserOutlined />,
  password = false,
  size,
  placeholder,
  type,
  onChange,
}: StyledInputProps) => {
  return password ? (
    <Input.Password size={size} placeholder={placeholder} type={type} prefix={<LockOutlined />} onChange={onChange} />
  ) : (
    <Input size={size} placeholder={placeholder} type={type} prefix={prefix} onChange={onChange} />
  );
};

export default StyledInput;
