import { ReactNode } from 'react';

import { StyledAlert } from './styles';

interface StyledAlertProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: ReactNode;
  showIcon?: boolean;
  description?: string;
  className?: string;
}

const Alert = ({ showIcon = true, message, type, icon, description, className }: StyledAlertProps) => (
  <StyledAlert
    className={className}
    message={message}
    type={type}
    icon={icon}
    showIcon={showIcon}
    description={description}
  />
);

export default Alert;
