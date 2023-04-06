import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

import banner1 from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";
import banner4 from "../../assets/images/banner-4.jpg";

interface IBanner {
  bannerLink: string;
}

export const banners: IBanner[] = [
  {
    bannerLink: banner1,
  },
  {
    bannerLink: banner2,
  },
  {
    bannerLink: banner3,
  },
  {
    bannerLink: banner4,
  },
];

const Banner = () => {
  return (
    <section className="banner">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner: IBanner, index: number) => (
          <SwiperSlide key={index}>
            <a href="">
              <img src={banner.bannerLink} alt={`Banner ${index}`} />
            </a>
          </SwiperSlide>
        ))}
        ;
      </Swiper>
    </section>
  );
};

export default Banner;
