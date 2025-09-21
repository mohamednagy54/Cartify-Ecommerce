"use client";

import { Button } from "@/components/ui/button";
import { slidesType } from "@/types/slides.type";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides: slidesType[] = [
  {
    id: 1,
    title: "Summer Sale Collections",
    subtitle: "Trendy Picks for Sunny Days",
    description: "Sale! Up to 50% off!",
    img: "/sliderImages/1.webp",
    url: "/list",
    bg: "bg-gradient-to-r from-yellow-100 via-blue-100 to-pink-100",
    buttonText: "Explore the Collections",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    subtitle: "Cozy Styles for Cold Weather",
    description: "Sale! Up to 50% off!",
    img: "/sliderImages/2.webp",
    url: "/list",
    bg: "bg-gradient-to-r from-blue-100 via-indigo-100 to-gray-100",
    buttonText: "Shop Sustainable",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    subtitle: "Fresh Looks for a New Season",
    description: "Sale! Up to 50% off!",
    img: "/sliderImages/3.webp",
    url: "/list",
    bg: "bg-gradient-to-r from-green-100 via-yellow-100 to-pink-100",
    buttonText: "Discover Collection",
  },
];

export default function SliderComponent() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative h-screen w-full overflow-hidden pt-10">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        speed={500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-screen">
            {/* Background Image */}
            <div className="absolute inset-0">
              <div className="relative w-full h-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-overlay" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-5xl text-white">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-4">
                    {slide.title}
                    <br />
                    <span className="italic font-extralight">
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 leading-relaxed text-white/90 max-w-xl">
                    {slide.description}
                  </p>
                  <Link href={slide.url}>
                    <Button
                      size="lg"
                      className="md:text-base px-8 py-4 cursor-pointer md:py-6 text-sm rounded-full hover:bg-[#F35C7A] hover:text-white transition-colors"
                    >
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <HiChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <HiChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
