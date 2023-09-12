import Spin from 'Components/Spin';

import { Container } from './styles';

const FullPageLoader = () => (
  <Container>
    <Spin size="large" spinning={true} tip="Loading..." />
  </Container>
);

export default FullPageLoader;
