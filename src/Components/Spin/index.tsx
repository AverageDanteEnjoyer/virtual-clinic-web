import { SpinProps } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import { StyledSpin } from './styles';

const Spin = ({ children, ...rest }: SpinProps) => (
  <StyledSpin {...rest} indicator={<SyncOutlined spin />}>
    {children}
  </StyledSpin>
);

export default Spin;
