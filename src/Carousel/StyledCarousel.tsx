import React from "react";
import { Carousel, Image } from "antd";

import CarouselStyles from "./StyledCarousel.module.css";

const StyledCarousel: React.FC = () => (
    <Carousel
      effect="fade"
      className={CarouselStyles.sliderContainer}
      autoplay
    >
      <div className={CarouselStyles.sliderContainer}>
        <Image
          src="assets/Carousel/img1.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <Image
          src="assets/Carousel/img2.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <Image
          src="assets/Carousel/img3.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <Image
          src="assets/Carousel/img4.jpg"
          className={CarouselStyles.img}
        />
      </div>
    </Carousel>
);

export default StyledCarousel;
