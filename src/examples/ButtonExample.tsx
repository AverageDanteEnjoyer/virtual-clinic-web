import React from "react";
import {Button} from "antd";

interface ButtonExampleProps {
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default",
  content?: string,
  disabled?: boolean,
}

const ButtonExample: React.FC<ButtonExampleProps> = ({type, content, disabled}: ButtonExampleProps) => (
  <Button
    type={type}
    disabled={disabled}
  >{content}</Button>
)

ButtonExample.defaultProps = {
  type: "primary",
  content: " ",
  disabled: false
}

export default ButtonExample
