import React from 'react';
import { Button } from 'antd';

interface StyledButtonProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  content?: string;
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ type, content, disabled }: StyledButtonProps) => (
  <Button type={type} disabled={disabled}>
    {content}
  </Button>
);

StyledButton.defaultProps = {
  type: 'primary',
  content: ' ',
  disabled: false,
};

export default StyledButton;
