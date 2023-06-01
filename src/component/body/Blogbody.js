import React from "react";
import "../../css/blog.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlus } from "react-icons/fa";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export default function Blogbody() {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const response = await axios.get(`${API_URL}/blog/all`);
    setBlog(response.data);
  };
  const settings = {
    accessibility: false,
    arrows: false,
    dots: false,
    draggable: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
    ],
    vertical: false,
    mobileFirst: false,
    pauseOnHover: false,
    rows: 1,
    slidesPerRow: 1,
    rtl: 0,
    slidesToShow_992: 2,
    slidesToScroll_992: 2,
    arrows_992: false,
    dots_992: false,
    slidesToShow_767: 2,
    slidesToScroll_767: 2,
    arrows_767: false,
    dots_767: false,
    slidesToShow_450: 1,
    slidesToScroll_450: 1,
    arrows_450: false,
    dots_450: false,
  };

  

  return (
    <div>
      <div className="blog-post">
        <div className="container">
          <h2 className="section-header">Tin tức mới nhất</h2>
          <p className="section-text"></p>

          <Slider
            className="blog-list blog-slick apslick slick-initialized slick-slider"
            {...settings}
          >
            {blog.map((item) => (
              <div key={item.idblog} className="blog-items blog-layout-items-1 slick-slide">
                <div className="blog-layout">
                  <a className="blog-link">
                    <div className="article-card__image media">
                      <img
                        alt={item.title}
                        width="1230"
                        height="690"
                        loading="lazy"
                        className="motion-reduce"
                        src={`/img/Blog/${item.img_blog}`}
                      />
                    </div>
                    <div className="blog-content text-center">
                      <p className="blog-date">
                        Post Date: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <a className="blog-link" href={item.url}>
                        <h2 className="blog-title">
                          <span className="link-hover">{item.tenblog}</span>
                        </h2>
                      </a>
                      <Link className="link-base link-" to={`/blog/${item.url}`}>
                        Xem Thêm <i><FaPlus /></i>
                      </Link>
                      <div dangerouslySetInnerHTML={{ __html: item.mota_chinh }}></div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
            }