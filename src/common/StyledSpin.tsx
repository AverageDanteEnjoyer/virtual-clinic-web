import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';

interface StyledSpinProps extends SpinProps{
  indicatorStyle?:React.CSSProperties;
}

const StyledSpin: React.FC<StyledSpinProps> = (props: StyledSpinProps) => (
  <Spin
    delay={props.delay}
    size={props.size}
    spinning={props.spinning}
    tip={props.tip}
    indicator={<SyncOutlined style={props.indicatorStyle} spin/>}
    className={props.className}
    wrapperClassName={props.wrapperClassName}
  >
    {props.children}
  </Spin>
);

StyledSpin.defaultProps={
  indicatorStyle : {fontSize:22},
}

export default StyledSpin;
