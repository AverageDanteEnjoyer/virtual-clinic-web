/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { Carousel, Image } from "antd";
import CarouselStyles from "./Carousel.module.css";

const CarouselComponent: React.FC = () => (
  <div className={CarouselStyles.wrapper}>
    <Carousel
      effect="fade"
      autoplay={true}
      className={CarouselStyles.sliderContainer}
    >
      <div className={CarouselStyles.sliderContainer}>
        <Image
          width={"100%"}
          src="assets/Carousel/img1.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <Image
          width={"100%"}
          src="assets/Carousel/img2.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <Image
          width={"100%"}
          src="assets/Carousel/img3.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <Image
          width={"100%"}
          src="assets/Carousel/img4.jpg"
          className={CarouselStyles.img}
        />
      </div>
    </Carousel>
  </div>
);

export default CarouselComponent;
