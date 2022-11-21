import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';

interface StyledSpinProps extends SpinProps{
  indicatorStyle?:React.CSSProperties;
}

const StyledSpin: React.FC<StyledSpinProps> = ({delay, size, spinning, tip, indicatorStyle, className, wrapperClassName, children}: StyledSpinProps) => (
  <Spin
    delay={delay}
    size={size}
    spinning={spinning}
    tip={tip}
    indicator={<SyncOutlined style={indicatorStyle} spin/>}
    className={className}
    wrapperClassName={wrapperClassName}
  >
    {children}
  </Spin>
);

StyledSpin.defaultProps={
  indicatorStyle : {fontSize:22},
}

export default StyledSpin;
