import React from 'react';
import { StyledButton } from './styles';

interface CustomButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  shape?: 'default' | 'round';
}

const Button = ({ type = 'primary', children, disabled, className, shape }: CustomButtonProps) => (
  <StyledButton className={className} type={type} disabled={disabled} shape={shape}>
    {children}
  </StyledButton>
);

export default Button;
