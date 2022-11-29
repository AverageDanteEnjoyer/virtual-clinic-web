import React from 'react';

import { StyledAlert } from './styles';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  description?: string;
}

const Alert = ({ showIcon = true, closable = true, message, type, icon, description}: StyledAlertProps) => (
  <StyledAlert message={message} type={type} icon={icon} showIcon={showIcon} closable={closable} description={description} />
);

export default Alert;
