import React from 'react';
import Alert from './styles';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
}

const StyledAlert = ({ showIcon = true, closable = true, message, type, icon }: StyledAlertProps) => (
  <Alert message={message} type={type} icon={icon} showIcon={showIcon} closable={closable} />
);

export default StyledAlert;
