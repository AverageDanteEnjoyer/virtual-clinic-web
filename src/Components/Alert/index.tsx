import React from 'react';
import { Alert } from 'antd';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  closable?: boolean;
  description?: string;
}

const StyledAlert = ({ showIcon = true, closable = true, message, type, description }: StyledAlertProps) => (
  <Alert message={message} type={type} showIcon={showIcon} closable={closable} description={description} />
);

export default StyledAlert;
