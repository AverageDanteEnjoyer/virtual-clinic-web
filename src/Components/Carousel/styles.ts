import { Carousel } from 'antd';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
  .ant-image-img,
  .ant-image-mask {
    border-radius: 10px;
  }

  .slick-list:focus {
    border: none;
  }
`;

export default StyledCarousel;
