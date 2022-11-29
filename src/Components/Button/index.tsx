import React from 'react';
import { StyledButton } from './styles';

interface CustomButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  size?: 'middle' | 'large';
  loading?: boolean;
  shape?: 'default' | 'round';
  className?: string;
}

const Button = ({
  type = 'primary',
  className,
  disabled,
  children,
  shape,
  htmlType,
  size,
  loading,
}: CustomButtonProps) => (
  <StyledButton
    className={className}
    type={type}
    disabled={disabled}
    shape={shape}
    htmlType={htmlType}
    size={size}
    loading={loading}
  >
    {children}
  </StyledButton>
);

export default Button;
