/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { Carousel, Image } from "antd";
import CarouselStyles from "./Carousel.module.css";

const contentStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: "2",
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  fontSize: "0",
  background: "transparent",
};

const CarouselComponent: React.FC = () => (
  <div className={CarouselStyles.wrapper}>
    <Carousel
      effect="fade"
      autoplay={true}
      className={CarouselStyles.sliderContainer}
    >
      <div className={CarouselStyles.sliderContainer}>
        <h3 style={contentStyle} className={CarouselStyles.img}></h3>
        <Image
          width={"100%"}
          src="assets/Carousel/img1.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <h3 style={contentStyle} className={CarouselStyles.img}></h3>
        <Image
          width={"100%"}
          src="assets/Carousel/img2.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <h3 style={contentStyle} className={CarouselStyles.img}></h3>
        <Image
          width={"100%"}
          src="assets/Carousel/img3.jpg"
          className={CarouselStyles.img}
        />
      </div>
      <div>
        <h3 style={contentStyle} className={CarouselStyles.img}></h3>
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
