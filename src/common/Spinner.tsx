import React, {ReactNode} from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface SpinnerProps{
  size?:number;
  content?:ReactNode;
  spinning?:boolean;
}
const Spinner: React.FC<SpinnerProps> = (props:SpinnerProps) => {
  return (
      <Spin spinning={props.spinning} indicator={<SyncOutlined style={{ fontSize: props.size }} spin />}>
        {props.content}
      </Spin>
      );
}
Spinner.defaultProps={
  size : 24,
  content : [],
  spinning : true,
}

export default Spinner;
