import React from "react";
import {Button, Space} from "antd";

const ButtonExample:React.FC=()=>{
  const buttonContent: string = "Click me!";
  return (
    <Space wrap>
      <Button type="primary">{buttonContent}</Button>
    </Space>
  );
}

export default ButtonExample
