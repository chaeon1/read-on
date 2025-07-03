'use client';

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PauseIcon from '@/icons/PauseIcon';
import PlayIcon from '@/icons/PlayIcon';

const Banner = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [playing, setPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const togglePlay = () => {
    if (playing) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
    setPlaying(!playing);
  };

  const banners = [
    { id: 1, text: '🎉 첫 번째 배너' },
    { id: 2, text: '🔥 두 번째 배너' },
    { id: 3, text: '🚀 세 번째 배너' },
    { id: 4, text: '🌟 네 번째 배너' },
    { id: 5, text: '💡 다섯 번째 배너' },
    { id: 6, text: '✨ 여섯 번째 배너' },
  ];

  const sliderSettings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (index: number) => setCurrentSlide(index),
    appendDots: (dots: React.ReactNode) => (
      <div className="w-full overflow-x-auto">
        <div className="custom-dots w-fit inline-flex">{dots}</div>
      </div>
    ),
  };

  return (
    <div className="relative flex justify-center">
      <div className="relative w-96 shadow-md rounded-xl">
        <Slider ref={sliderRef} {...sliderSettings}>
          {banners.map((banner) => (
            <div key={banner.id}>
              <div
                className={`h-64 rounded-lg flex items-center justify-center text-xl font-semibold`}
              >
                {banner.text}
              </div>
            </div>
          ))}
        </Slider>
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <button
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={togglePlay}
            className="w-6 h-6 flex justify-center items-center bg-black/30 rounded-full text-lg"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex items-center justify-center gap-1 bg-black/30 text-white px-2 py-1 rounded-full text-xs">
            <span>{currentSlide + 1}</span>
            <span className="opacity-50">/</span>
            <span className="opacity-80">{banners.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
