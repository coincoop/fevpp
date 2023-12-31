import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import "../../css/slideheader.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_URL } from "../../config";
export default function SlideHeader() {
  const sliderRef = useRef(null);
  const settings = {
    accessibility: false,
    arrows: false,
    dots: false,
    draggable: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    mobileFirst: true,
    pauseOnHover: false,
    rows: 1,
    slidesPerRow: 1,
    rtl: 0,
    slidesToShow_992: 1,
    slidesToScroll_992: 1,
    arrows_992: false,
    dots_992: false,
    slidesToShow_767: 1,
    slidesToScroll_767: 1,
    arrows_767: false,
    dots_767: false,
    slidesToShow_450: 1,
    slidesToScroll_450: 1,
    arrows_450: false,
    dots_450: false,
  };
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  useEffect(() => {
    fetchHome();
  }, []);
  const fetchHome = async () => {
    const response = await axios.get(`${API_URL}home/status`);
    setImg1(response.data.img1);
    setImg2(response.data.img2);
    setImg3(response.data.img3);
  };
  const headerItems = [
    {
      id: 1,
      
      imageSrc:  img1 ,
    },
    {
      id: 2,
    
      imageSrc: img2 ,
    },
    {
      id: 3,
    
      imageSrc:  img3 ,
    },
  ];

  return (
    <div className="header-carousel">
      <Slider
        className="header-list header-slick apslick slick-initialized slick-slider"
        {...settings}
        ref={sliderRef}
      >
        {headerItems.map((item) => (
          <div
            key={item.id}
            className="header-items header-layout slick-slide"
            data-slick-index={item.id - 1}
            aria-hidden="true"
            tabIndex="-1"
          >
            <div className="header-layout__inner">
              <div className="article-card__image media">
                <img
                  alt=""
                  loading="lazy"
                  className="motion-reduce"
                  src={`/img/home/${item.imageSrc}`}
                />
              </div>
              {/* <div className="carousel-titles">
                <h4 className="sub-title">{item.subtitle}</h4>
                <h2 className="title">
                  <div>{item.title}</div>
                </h2>
                <a className="link-button link-" href="/">
                  Shop Now
                  <i>
                    <FaArrowRight />
                  </i>
                </a>
              </div> */}
            </div>
          </div>
        ))}
      </Slider>
      <div className="carousel-controls">
        <button
          type="button"
          className="slick-prev slick-arrow"
          onClick={() => {
            sliderRef.current.slickPrev();
          }}
        >
          Prev
        </button>
        <button
          type="button"
          className="slick-next slick-arrow"
          onClick={() => {
            sliderRef.current.slickNext();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
