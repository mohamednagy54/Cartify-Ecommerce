"use client";

import Image from "next/image";
import React, { useState } from "react";

// const images: { id: number; url: string }[] = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?_gl=1*1un5vu4*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDI5NjUkajI4JGwwJGgw",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/6786665/pexels-photo-6786665.jpeg?_gl=1*1r55df5*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDI5OTUkajU5JGwwJGgw",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg?_gl=1*1vjybr*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDMwMTQkajQwJGwwJGgw",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/29694936/pexels-photo-29694936.jpeg?_gl=1*2i48q0*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDMwNDYkajgkbDAkaDA.",
//   },
// ];

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-[470px] rounded-2xl overflow-hidden shadow-xl">
        {loading && (
          <Image
            src={images[index]}
            alt=""
            fill
            sizes="50vw"
            className="object-contain hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-4 overflow-hidden p-2">
        {images.map((item: string, i: number) => (
          <div
            className={`relative w-28 h-28 rounded-xl overflow-hidden border 
              ${index === i ? "border-pink-500" : "border-gray-300"} 
              hover:scale-110 transition-transform duration-300`}
            key={i}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
