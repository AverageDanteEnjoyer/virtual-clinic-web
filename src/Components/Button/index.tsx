import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  content?: string;
  disabled?: boolean;
  className?: string;
}

const CustomButton = ({ type = 'primary', content, disabled, className }: CustomButtonProps) => (
  <Button className={className} type={type} disabled={disabled}>
    {content}
  </Button>
);

export default CustomButton;
