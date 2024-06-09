import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './InfoSlider.css'; // Assuming your CSS file is named InfoSlider.css

import slpImage from '../../assets/slp-coin.png'; // Update the path to your image

const InfoSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // if you want to auto-play the slides
    autoplaySpeed: 3000, // time each slide remains visible
  };

  return (
    <div className="info-slider-container">
      <Slider {...settings}>
        <div className="slide">
          <div className="slide-content">
            <div className="slide-text">
              <h2>What is SLP?</h2>
              <p>
                SLP is Sudo’s liquidity provider token, representing your share
                of Sudo’s liquidity pool.
              </p>
              <p>
                You can provide 3 kinds of assets to the sudo liquidity pool:
                SUI, USDC and USDT.
              </p>
              <p>
                The market cap and the total supply of SLP is decided by the
                total value of assets in pool and positions traders hold onto.
              </p>
              <p>
                For SLP Stage 3 Mint, Sudo will open up in total 750k SLP supply
                to the public. Stage 3 Mint will happen in 3 phases:
              </p>
              <ul>
                <li>
                  {' '}
                  Phase 1: 100k for USDC mint, 100k for USDT mint and 50k for
                  Sui mint.{' '}
                </li>
                <li>
                  {' '}
                  Phase 2: 100k for USDC mint, 100k for USDT mint and 25k for
                  Sui mint.{' '}
                </li>
                <li>
                  {' '}
                  Phase 3: 125k for USDC mint, 125k for USDT mint and 25k for
                  Sui mint.{' '}
                </li>
              </ul>
              <p>
                You will soon be able to check which phase of mint you are
                eligible for.
              </p>
              <p>
                Learn more about SLP Stage 3 Mint{' '}
                <a
                  href="https://twitter.com/sudofinance/status/1753162306023022770"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  here{' '}
                </a>
              </p>
            </div>
            <img src={slpImage} alt="SLP Icon" className="slide-image" />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default InfoSlider;
