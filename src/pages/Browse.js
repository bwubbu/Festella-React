import React from 'react';
import AllEvents from '../components/AllEvents';
import Slider from 'react-slick';
import '../styles/Events.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing images
import imageTaylor from '../assets/images/Featured_Taylor.jpg';
import imageOR from '../assets/images/OR_Featured.jpg';
import imageTwice from '../assets/images/Twice_Featured.jpg';
import imageGura from '../assets/images/Gura_Featured.jpg';
import imageVaundy from '../assets/images/Vaundy_Featured.jpg';
import imageFootball from '../assets/images/Fb_Featured.jpg';
import imageSolo from '../assets/images/Solo.png';
import imageApeng from '../assets/images/Apeng.jpg';
import imageMessi from '../assets/images/Messi.jpg';

const Browse = () => {
  const sliderSettings = {
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
    <div className="browse-container">
      <div className="featured-and-artist-container">
        {/* Featured Events Section */}
        <div className="featured-events-container">
          <div className="featured-games header-text">
            <div className="heading-section">
              <h4><em>Featured</em> Events</h4>
            </div>
            <Slider {...sliderSettings}>
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
                <h4>Gura 3D Concert<br /><span>2K Sold</span></h4>
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

        {/* Top Artist Section */}
        <div className="top-artist">
          <div className="heading-section">
            <h4><em>Top</em> Artist</h4>
          </div>
          <ul>
            <li>
              <img src={imageSolo} alt="Arise" />
              <div>
                <h4>Arise</h4>
                <h6>Solo Leveling</h6>
              </div>
              <span><i className="fa fa-star" style={{ color: 'yellow' }}></i> 5</span>
              <span><i className="fa fa-play" style={{ color: '#ec6090' }}></i> 3K</span>
            </li>
            <li>
              <img src={imageApeng} alt="Aq Seorang Hesmes" />
              <div>
                <h4>Aq Seorang Hesmes</h4>
                <h6>Apeng</h6>
              </div>
              <span><i className="fa fa-star" style={{ color: 'yellow' }}></i> 6.9</span>
              <span><i className="fa fa-play" style={{ color: '#ec6090' }}></i> 1K</span>
            </li>
            <li>
              <img src={imageMessi} alt="The Goat" />
              <div>
                <h4>The Goat</h4>
                <h6>Messi</h6>
              </div>
              <span><i className="fa fa-star" style={{ color: 'yellow' }}></i> 3</span>
              <span><i className="fa fa-play" style={{ color: '#ec6090' }}></i> 0.5K</span>
            </li>
          </ul>
          <div className="text-button">
            <a>And more to come</a>
          </div>
        </div>
      </div>

      {/* All Events Section */}
      <div className="all-events-container">
        <AllEvents />
      </div>
    </div>
  );
};

export default Browse;
