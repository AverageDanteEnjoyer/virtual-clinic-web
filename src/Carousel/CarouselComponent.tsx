/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { Carousel, Image } from "antd";
import CarouselStyles from "./Carousel.module.css";

const CarouselComponent: React.FC = () => (
    <Carousel
      effect="fade"
      autoplay={true}
      className={CarouselStyles.sliderContainer}
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

export default CarouselComponent;
