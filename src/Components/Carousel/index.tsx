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
    'assets/Carousel/img1.jpg',
    'assets/Carousel/img2.jpg',
    'assets/Carousel/img3.jpg',
    'assets/Carousel/img4.jpg',
  ];

  return (
    <StyledCarousel autoplay={autoplay} dotPosition={dotPosition} dots={dots} easing={easing} effect={effect}>
      {CarouselData.map((img, idx) => {
        return <Image key={idx} src={img} preview={false} />;
      })}
    </StyledCarousel>
  );
};

export default Carousel;
