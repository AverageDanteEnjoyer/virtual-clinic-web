import React, {ReactNode} from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface SpinnerProps{
  tip?:string,
  content?:ReactNode;
  spinning?:boolean;
  style?:React.CSSProperties;
}
const Spinner: React.FC<SpinnerProps> = (props:SpinnerProps) => {
  return (
      <Spin
        spinning={props.spinning}
        indicator={<SyncOutlined style={props.style} spin />}
        tip={props.tip}
      >
        {props.content}
      </Spin>
      );
}
Spinner.defaultProps={
  tip : "",
  content : [],
  spinning : true,
  style : {fontSize:22}
}

export default Spinner;
