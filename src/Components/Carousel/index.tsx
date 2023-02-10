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

const StyledCarousel = ({
  autoplay = true,
  effect = 'fade',
  className = CarouselStyles.sliderContainer,
  dotPosition,
  dots,
  easing,
}: StyledCarouselProps) => {
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

export default StyledCarousel;
