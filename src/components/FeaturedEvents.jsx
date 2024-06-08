import React from 'react';
import Slider from 'react-slick';
import '../styles/FeaturedEvents.css';

// Importing images
import imageTaylor from '../assets/images/Featured_Taylor.jpg';
import imageOR from '../assets/images/OR_Featured.jpg';
import imageTwice from '../assets/images/Twice_Featured.jpg';
import imageGura from '../assets/images/Gura_Featured.jpg';
import imageVaundy from '../assets/images/Vaundy_Featured.jpg';
import imageFootball from '../assets/images/Fb_Featured.jpg';

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const FeaturedEvents = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="featured-events-container">
      <div className="featured-games header-text">
        <div className="heading-section">
          <h4><em>Featured</em> Events</h4>
        </div>
        <Slider {...settings}>
          <div className="item">
            <div className="thumb">
              <img src={imageTaylor} alt="Taylor Era Concert" />
              <div className="hover-effect">
                <h6>Top 1</h6>
              </div>
            </div>
            <h4>Taylor Era Concert<br /><span>10K Sold</span></h4>
            <ul>
              <li><i className="fa fa-star"></i> 4.8</li>
              <li><i className="fa fa-play"></i> 1M</li>
            </ul>
          </div>
          <div className="item">
            <div className="thumb">
              <img src={imageOR} alt="One Republic Tour" />
              <div className="hover-effect">
                <h6>#New Trending</h6>
              </div>
            </div>
            <h4>One Republic Tour<br /><span>3K Sold</span></h4>
            <ul>
              <li><i className="fa fa-star"></i> 4.5</li>
              <li><i className="fa fa-eye"></i> 300K</li>
            </ul>
          </div>
          <div className="item">
            <div className="thumb">
              <img src={imageTwice} alt="Twice" />
              <div className="hover-effect">
                <h6>Top Chart</h6>
              </div>
            </div>
            <h4>Twice<br /><span>10K Sold</span></h4>
            <ul>
              <li><i className="fa fa-star"></i> 4.6</li>
              <li><i className="fa fa-eye"></i> 1M</li>
            </ul>
          </div>
          <div className="item">
            <div className="thumb">
              <img src={imageGura} alt="Gura 3D Concert" />
              <div className="hover-effect">
                <h6>#Top Vtuber</h6>
              </div>
            </div>
            <h4>Gura 3D Concert<br /><span>2K Solds</span></h4>
            <ul>
              <li><i className="fa fa-star"></i> 4.8</li>
              <li><i className="fa fa-eye"></i> 10K</li>
            </ul>
          </div>
          <div className="item">
            <div className="thumb">
              <img src={imageVaundy} alt="Vaundy" />
              <div className="hover-effect">
                <h6>2.4K Streaming</h6>
              </div>
            </div>
            <h4>Vaundy<br /><span>2K Sold</span></h4>
            <ul>
              <li><i className="fa fa-star"></i> 4.9</li>
              <li><i className="fa fa-eye"></i> 0.5M</li>
            </ul>
          </div>
          <div className="item">
            <div className="thumb">
              <img src={imageFootball} alt="A Football Era" />
              <div className="hover-effect">
                <h6>2.4K Streaming</h6>
              </div>
            </div>
            <h4>A Football Era<br /><span>30K Sold</span></h4>
            <ul>
              <li><i className="fa fa-star"></i> 4.2</li>
              <li><i className="fa fa-eye"></i> 1M</li>
            </ul>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedEvents;
