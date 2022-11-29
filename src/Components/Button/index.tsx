import React from 'react';
import { Button } from 'antd';

interface StyledButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  size?: 'middle' | 'large';
  loading?: boolean;
}

const StyledButton = ({ type = 'primary', disabled, children, htmlType, size, loading }: StyledButtonProps) => (
  <Button type={type} disabled={disabled} htmlType={htmlType} size={size} loading={loading}>
    {children}
  </Button>
);

export default StyledButton;
