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
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setTimeout(() => setIsDragging(false), 0),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) e.preventDefault();
  };

  return (
    <div className="px-4">
      <Slider {...settings}>
        {categories.map((cat) => (
          <div key={cat._id} className="px-3">
            <Link
              href={`/list?category=${cat.slug}`}
              onClick={(e) => handleClick(e)}
            >
              <div className="relative bg-slate-100 w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                
                
                <span className="absolute top-3 left-3 bg-white text-black text-[14px] md:text-[18px] font-semibold px-3 py-1 rounded-full shadow">
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
