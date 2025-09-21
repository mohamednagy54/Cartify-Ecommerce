"use client";
import { CategoryType } from "@/types/categories.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CategorySlider({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) e.preventDefault();
  };

  return (
    <div className="px-2 md:px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={5}
        onSlideChange={() => setIsDragging(true)}
        onTouchEnd={() => setTimeout(() => setIsDragging(false), 0)}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <Link
              href={`/list?category=${cat.slug}`}
              onClick={handleClick}
              draggable={false}
            >
              <div className="relative group bg-slate-100 w-full h-[300px]  md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         (max-width: 1280px) 25vw,
                         20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  draggable={false}
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-black text-sm md:text-lg font-semibold px-3 py-1 rounded-full shadow-md">
                  {cat.name}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
