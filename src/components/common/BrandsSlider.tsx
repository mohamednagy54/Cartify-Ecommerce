"use client";

import { BrandType } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function BrandsSlider({ brands }: { brands: BrandType[] }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, centerMode: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerMode: true } },
    ],
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="py-6  ">
      {brands.length > 0 && (
        <Slider {...settings} className="brands-slider">
          {brands.map((brand: BrandType) => (
            <div key={brand._id} className="">
              <div className="flex items-center justify-center p-6 border bg-white   transition-transform hover:scale-105 cursor-pointer">
                <Link
                  href={`/list?brand=${brand.slug}`}
                  className="relative w-full h-16  bg-white transition-transform hover:scale-105 cursor-pointer"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 480px) 100vw,
                            (max-width: 768px) 50vw,
                            (max-width: 1024px) 33vw,
                                                25vw"
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
