import React from 'react';
import { Alert } from 'antd';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  closable?: boolean;
}

const StyledAlert = ({ showIcon = true, closable = true, message, type }: StyledAlertProps) => (
  <Alert message={message} type={type} showIcon={showIcon} closable={closable} />
);

export default StyledAlert;
