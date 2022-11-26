import React from 'react';
import { Button } from 'antd';

interface StyledButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  size?: 'middle' | 'large';
}

const StyledButton = ({ type = 'primary', disabled, children, htmlType, size }: StyledButtonProps) => (
  <Button type={type} disabled={disabled} htmlType={htmlType} size={size}>
    {children}
  </Button>
);

export default StyledButton;
