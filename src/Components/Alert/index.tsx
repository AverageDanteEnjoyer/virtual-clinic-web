import React from 'react';

import { StyledAlert } from './styles';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  description?: string;
  className?: string;
}

const Alert = ({ showIcon = true, closable = true, message, type, icon, description, className }: StyledAlertProps) => (
  <StyledAlert
    className={className}
    message={message}
    type={type}
    icon={icon}
    showIcon={showIcon}
    closable={closable}
    description={description}
  />
);

export default Alert;
