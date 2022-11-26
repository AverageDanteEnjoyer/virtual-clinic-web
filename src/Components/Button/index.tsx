import React from 'react';
import Button from './styles';

interface CustomButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  shape?: 'default' | 'round';
}

const CustomButton = ({ type = 'primary', children, disabled, className, shape }: CustomButtonProps) => (
  <Button className={className} type={type} disabled={disabled} shape={shape}>
    {children}
  </Button>
);

export default CustomButton;
