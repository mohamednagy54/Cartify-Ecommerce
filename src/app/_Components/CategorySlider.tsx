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
      <div className="">
        <Slider {...settings}>
          {categories.map((cat) => (
            <div key={cat._id} className="px-3">
              <Link
                href={`/list?category=${cat._id}`}
                onClick={(e) => handleClick(e)}
              >
                <div className="relative bg-slate-100 w-full h-[400px]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <h1 className="mt-4 font-light text-xl tracking-wide">
                  {cat.name}
                </h1>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
