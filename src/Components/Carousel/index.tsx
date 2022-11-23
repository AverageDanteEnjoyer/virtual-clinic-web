import React from 'react';
import { Carousel, Image } from 'antd';
import CarouselStyles from './StyledCarousel.module.css';

interface StyledCarouselProps {
  autoplay?: boolean;
  dotPosition?: 'top' | 'right' | 'bottom' | 'left';
  dots?: boolean;
  easing?: string;
  effect?: 'scrollx' | 'fade';
  className?: string;
}

const StyledCarousel = ({ autoplay, dotPosition, dots, easing, effect, className }: StyledCarouselProps) => {
  const CarouselData = [
    'assets/Carousel/img1.jpg',
    'assets/Carousel/img2.jpg',
    'assets/Carousel/img3.jpg',
    'assets/Carousel/img4.jpg',
  ];

  return (
    <Carousel
      autoplay={autoplay}
      dotPosition={dotPosition}
      dots={dots}
      easing={easing}
      effect={effect}
      className={className}
    >
      {CarouselData.map((img, idx) => {
        return <Image key={idx} src={img} className={CarouselStyles.img} />;
      })}
    </Carousel>
  );
};

StyledCarousel.defaultProps = {
  autoplay: true,
  effect: 'fade',
  className: CarouselStyles.sliderContainer,
};

export default StyledCarousel;
