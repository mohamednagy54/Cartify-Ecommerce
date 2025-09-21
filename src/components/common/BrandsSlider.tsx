"use client";

import { BrandType } from "@/types/brand.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "swiper/css";

export default function BrandsSlider({ brands }: { brands: BrandType[] }) {
  if (brands.length === 0) return null;

  return (
    <div className="py-6">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={4}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        loop={false}
      >
        {brands.map((brand: BrandType) => (
          <SwiperSlide key={brand._id}>
            <div className="flex items-center justify-center p-6 border bg-white transition-transform  cursor-pointer">
              <Link
                href={`/list?brand=${brand.slug}`}
                className="relative w-full h-16 bg-white transition-transform hover:scale-105 cursor-pointer"
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
