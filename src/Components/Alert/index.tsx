import React from 'react';

import { StyledAlert } from './styles';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
}

const Alert = ({ showIcon = true, closable = true, message, type, icon }: StyledAlertProps) => (
  <StyledAlert message={message} type={type} icon={icon} showIcon={showIcon} closable={closable} />
);

export default Alert;
