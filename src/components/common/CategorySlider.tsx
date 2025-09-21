"use client";
import { CategoryType } from "@/types/categories.type";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function CategorySlider({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [isDragging, setIsDragging] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // xl >= 1280px
    slidesToScroll: 2,
    swipeToSlide: true,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setTimeout(() => setIsDragging(false), 0),

    responsive: [
      {
        breakpoint: 1280, // < xl
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 1024, // < lg
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // < md
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640, // < sm
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) e.preventDefault();
  };

  return (
    <div className="px-2 md:px-4">
      <Slider {...settings} className="category-slider">
        {categories.map((cat) => (
          <div key={cat._id} className="px-2">
            <Link
              href={`/list?category=${cat.slug}`}
              onClick={handleClick}
              draggable={false}
            >
              <div className="relative group bg-slate-100 w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
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
          </div>
        ))}
      </Slider>
    </div>
  );
}
