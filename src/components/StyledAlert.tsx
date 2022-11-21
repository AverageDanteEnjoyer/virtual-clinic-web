import React from "react";
import {Alert} from "antd";

interface StyledAlertProps {
  message?: string,
  type?: "success" | "info" | "warning" | "error",
  showIcon?: boolean;
  closable?: boolean;
}

const StyledAlert: React.FC<StyledAlertProps> = ({message, type, showIcon, closable}: StyledAlertProps) => (
  <Alert
    message={message}
    type={type}
    showIcon={showIcon}
    closable={closable}
  />
)

StyledAlert.defaultProps = {
  message: " ",
  type: "info",
  showIcon: true,
  closable: true
}

export default StyledAlert
