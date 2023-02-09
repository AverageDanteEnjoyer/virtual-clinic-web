import { SpinProps } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import { StyledSpin } from 'Components/Spin/styles';

const Spin = ({ className, delay, size, spinning, tip, children }: SpinProps) => (
  <StyledSpin
    className={className}
    delay={delay}
    size={size}
    spinning={spinning}
    tip={tip}
    indicator={<SyncOutlined spin />}
  >
    {children}
  </StyledSpin>
);

export default Spin;
