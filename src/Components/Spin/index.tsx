import { CSSProperties } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';

interface StyledSpinProps extends SpinProps {
  indicatorStyle?: CSSProperties;
}

const StyledSpin = ({
  indicatorStyle = { fontSize: 22 },
  delay,
  size,
  spinning,
  tip,
  className,
  wrapperClassName,
  children,
}: StyledSpinProps) => (
  <Spin
    delay={delay}
    size={size}
    spinning={spinning}
    tip={tip}
    indicator={<SyncOutlined style={indicatorStyle} spin />}
    className={className}
    wrapperClassName={wrapperClassName}
  >
    {children}
  </Spin>
);

export default StyledSpin;
