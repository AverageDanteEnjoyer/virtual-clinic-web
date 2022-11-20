import React from "react";
import {Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const InputExample:React.FC=()=>{
  return (
    <Input
      size="large"
      placeholder="enter email"
      prefix={<UserOutlined/>}
    />
  );
}

export default InputExample
