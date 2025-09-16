"use client";

import { Button } from "@/components/ui/button";
import { slidesType } from "@/types/slides.type";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides: slidesType[] = [
  {
    id: 1,
    title: "Summer Sale Collections",
    subtitle: "Trendy Picks for Sunny Days", // 👈 Subtitle جديد
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/27045934/pexels-photo-27045934.jpeg?_gl=1*1k3ra3e*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTc4MjUxOTEkbzExJGcxJHQxNzU3ODI1MjI3JGoyNCRsMCRoMA..",
    url: "/list",
    bg: "bg-gradient-to-r from-yellow-100 via-blue-100 to-pink-100",
    reverse: false,
    buttonText: "Explore the Collections",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    subtitle: "Cozy Styles for Cold Weather", // 👈 Subtitle جديد
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/17395505/pexels-photo-17395505.jpeg?_gl=1*fmiq4m*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTc4MjUxOTEkbzExJGcxJHQxNzU3ODI1MzUyJGoyMCRsMCRoMA..",
    url: "/list",
    bg: "bg-gradient-to-r from-blue-100 via-indigo-100 to-gray-100",
    reverse: true,
    buttonText: "Shop Sustainable",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    subtitle: "Fresh Looks for a New Season", // 👈 Subtitle جديد
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/8638715/pexels-photo-8638715.jpeg?_gl=1*19i14q*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTc4MjUxOTEkbzExJGcxJHQxNzU3ODI1NDg2JGoyNSRsMCRoMA..",
    url: "/list",
    bg: "bg-gradient-to-r from-green-100 via-yellow-100 to-pink-100",
    reverse: false,
    buttonText: "Discover Collection",
  },
];


export default function SliderComponent() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: false,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 pb-5 bg-white rounded-full transition-all duration-300 hover:bg-white/50" />
    ),
    dotsClass: "slick-dots custom-dots",
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden pt-10 ">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-screen">
            {/* Background Image */}
            <div className="absolute inset-0">
              <div className="w-full h-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="100vw"
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
                  <Link href="/list">
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
          </div>
        ))}
      </Slider>

      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        <button
          onClick={goToPrev}
          className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <HiChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={goToNext}
          className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <HiChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
