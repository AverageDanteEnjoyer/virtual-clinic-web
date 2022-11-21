import React from "react";
import {Input, InputProps} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";

interface InputExampleProps extends InputProps {
  password?: boolean,
}

const InputExample: React.FC<InputExampleProps> = ({size, placeholder, prefix, password}: InputExampleProps) => {
  const DefaultInput = (
    <Input
      size={size}
      placeholder={placeholder}
      prefix={prefix}
    />
  )

  const PasswordInput = (
    <Input.Password
      size={size}
      placeholder="password"
      prefix={<LockOutlined/>}
    />
  )

  return password ? PasswordInput : DefaultInput
}

InputExample.defaultProps = {
  size: "middle",
  placeholder: " ",
  prefix: <UserOutlined/>,
  password: true
}

export default InputExample
