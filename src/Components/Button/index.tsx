import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const CustomButton = ({ type = 'primary', children, disabled, className }: CustomButtonProps) => (
  <Button className={className} type={type} disabled={disabled}>
    {children}
  </Button>
);

export default CustomButton;
