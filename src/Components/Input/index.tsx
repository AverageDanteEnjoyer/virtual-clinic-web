import React from 'react';
import { Input, InputProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface StyledInputProps extends InputProps {
  password?: boolean;
}

const StyledInput = ({ size, placeholder, prefix, password }: StyledInputProps) => {
  return password ? (
    <Input.Password size={size} placeholder={placeholder} prefix={<LockOutlined />} />
  ) : (
    <Input size={size} placeholder={placeholder} prefix={prefix} />
  );
};

StyledInput.defaultProps = {
  prefix: <UserOutlined />,
  password: false,
};

export default StyledInput;
