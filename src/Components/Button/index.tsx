import React from 'react';
import { Button } from 'antd';

interface StyledButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
}

const StyledButton = ({ type = 'primary', disabled, children, htmlType }: StyledButtonProps) => (
  <Button type={type} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export default StyledButton;
