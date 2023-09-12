import { Image } from 'antd';

import StyledCarousel from './styles';

interface StyledCarouselProps {
  autoplay?: boolean;
  dotPosition?: 'top' | 'right' | 'bottom' | 'left';
  dots?: boolean;
  easing?: string;
  effect?: 'scrollx' | 'fade';
}

const Carousel = ({ autoplay = true, effect = 'fade', dotPosition, dots, easing }: StyledCarouselProps) => {
  const CarouselData = [
    '/assets/Carousel/image1.webp',
    '/assets/Carousel/image2.webp',
    '/assets/Carousel/image3.webp',
    '/assets/Carousel/image4.webp',
  ];

  return (
    <StyledCarousel autoplay={autoplay} dotPosition={dotPosition} dots={dots} easing={easing} effect={effect}>
      {CarouselData.map((img, idx) => {
        return <Image key={idx} src={img} preview={false} alt="carousel" width="100%" height="100%" />;
      })}
    </StyledCarousel>
  );
};

export default Carousel;
