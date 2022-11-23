import React from 'react';
import { Alert } from 'antd';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  closable?: boolean;
}

const StyledAlert = ({ message, type, showIcon, closable }: StyledAlertProps) => (
  <Alert message={message} type={type} showIcon={showIcon} closable={closable} />
);

StyledAlert.defaultProps = {
  showIcon: true,
  closable: true,
};

export default StyledAlert;
