import React from 'react';
import { Button } from 'antd';

interface StyledButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  content?: string;
  disabled?: boolean;
}

const StyledButton = ({ type = 'primary', content = '', disabled = false }: StyledButtonProps) => (
  <Button type={type} disabled={disabled}>
    {content}
  </Button>
);

export default StyledButton;

