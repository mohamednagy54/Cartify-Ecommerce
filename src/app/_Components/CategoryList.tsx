"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function CategoryList() {
  const [isDragging, setIsDragging] = useState(false);

  const categories = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    name: `Category ${i + 1}`,
    img: "/category.png",
    url: "/list",
  }));

  const settings = {
    dots: false,

    infinite: true,
    speed: 500,
    slidesToShow:5,
    slidesToScroll: 2,
    beforeChange: () => setIsDragging(true), 
    afterChange: () => setTimeout(() => setIsDragging(false), 0), 
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024, // lg
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640, // sm
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // موبايل
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleClick = (e: React.MouseEvent, url: string) => {
    if (isDragging) {
      e.preventDefault(); // لو فيه سحب → امنع الفتح
    }
  };

  return (
    <div className="px-4">
      <div className="">
        <Slider {...settings}>
          {categories.map((cat) => (
            <div key={cat.id} className="px-3 ">
              <Link href={cat.url} onClick={(e) => handleClick(e, cat.url)}>
                <div className="relative bg-slate-100 w-full h-96">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    sizes="20vw"
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
