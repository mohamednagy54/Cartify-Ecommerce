"use client";

import { slidesType } from "@/types/slides.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

const slides: slidesType[] = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/29051341/pexels-photo-29051341.jpeg?_gl=1*wv30bb*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTYzMjMzNzckbzIkZzEkdDE3NTYzMjM1NTMkajQzJGwwJGgw",
    url: "/list",
    bg: "bg-gradient-to-r from-yellow-100 via-blue-100 to-pink-100",
    reverse: false,
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/15647646/pexels-photo-15647646.jpeg?_gl=1*cacro2*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTYzMjMzNzckbzIkZzEkdDE3NTYzMjM0MjQkajEzJGwwJGgw",
    url: "/list",
    bg: "bg-gradient-to-r from-blue-100 via-indigo-100 to-gray-100",
    reverse: true,
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list",
    bg: "bg-gradient-to-r from-green-100 via-yellow-100 to-pink-100",
    reverse: false,
  },
];

export default function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    
  };
  return (
    <div className="h-[calc(100vh+80px)] overflow-hidden ">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            className={`${
              slide.bg
            } w-screen h-screen !flex flex-col xl:flex-row ${
              slide.reverse ? "xl:flex-row-reverse" : ""
            }`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center relative p-2">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4 cursor-pointer border border-black hover:bg-white hover:text-black hover:border hover:border-gray-500 transition-colors ease-in ">
                  SHOP NOW
                </button>
              </Link>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:h-full xl:w-1/2 relative ">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* CUSTOM DOTS */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full">
        <style jsx global>{`
          .slick-dots {
            bottom: 40 !important;
            display: flex !important;
            justify-content: center;
          }

          .slick-dots li button:before {
            content: "";
            width: 14px;
            height: 14px;
            background-color: transparent;
            border: 2px solid gray;
            border-radius: 50%;
            display: block;
            opacity: 0.7;
            transition: all 0.3s;
          }

          .slick-dots li.slick-active button:before {
            width: 10px;
            height: 10px;
            background-color: #3a3838;
            border: none;
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
}
