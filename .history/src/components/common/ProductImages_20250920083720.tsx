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
      <div className="relative h-[470px] rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-gray-100">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <Image
          key={index} 
          src={images[index]}
          alt={`Product image ${index + 1}`}
          fill
          sizes="50vw"
          className={`object-contain transition-all duration-500 ${
            loading ? "opacity-0" : "opacity-100 hover:scale-105"
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>

      
      
      <div className="flex flex-wrap gap-4 overflow-hidden p-2">
        {images.map((item: string, i: number) => (
          <button
            type="button"
            className={`relative w-28 h-28 rounded-xl overflow-hidden border 
              ${index === i ? "border-pink-500" : "border-gray-300"} 
              hover:scale-110 transition-transform duration-300`}
            key={i}
            onClick={() => {
              setIndex(i);
              setLoading(true); 
            }}
          >
            <Image
              src={item}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
