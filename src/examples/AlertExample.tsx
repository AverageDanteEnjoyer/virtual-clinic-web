import React from "react";
import {Alert} from "antd";

interface AlertExampleProps {
  message?: string,
  type?: "success" | "info" | "warning" | "error",
  showIcon?: boolean;
  closable?: boolean;
}

const AlertExample: React.FC = ({message, type, showIcon, closable}: AlertExampleProps) => (
  <Alert
    message={message}
    type={type}
    showIcon={showIcon}
    closable={closable}
  />
)

AlertExample.defaultProps = {
  message: " ",
  type: "info",
  showIcon: true,
  closable: true
}

export default AlertExample
