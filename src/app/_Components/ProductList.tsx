import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductListProps {
  limit: number;
  searchParams?: any;
}

export default async function ProductList({ limit }: ProductListProps) {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {/* product */}
      <Link
        href={"/"}
        className="flex flex-col gap-4 w-full sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="/product.png"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />

          <Image
            src={"/woman.png"}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Virtual Incense</span>
          <span className="font-bold">$45</span>
        </div>

        <div className="text-sm text-gray-500">Screne digital aromatherapy</div>

        <button className="rounded-2xl w-max ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs cursor-pointer hover:bg-[#F35C7A] hover:text-white transition-colors">
          Add to Cart
        </button>
      </Link>
      {/* product */}
      <Link
        href={"/"}
        className="flex flex-col gap-4 w-full sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="/product.png"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />

          <Image
            src={"/woman.png"}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Virtual Incense</span>
          <span className="font-bold">$45</span>
        </div>

        <div className="text-sm text-gray-500">Screne digital aromatherapy</div>

        <button className="rounded-2xl w-max ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs cursor-pointer hover:bg-[#F35C7A] hover:text-white transition-colors">
          Add to Cart
        </button>
      </Link>
      {/* product */}
      <Link
        href={"/"}
        className="flex flex-col gap-4 w-full sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="/product.png"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />

          <Image
            src={"/woman.png"}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Virtual Incense</span>
          <span className="font-bold">$45</span>
        </div>

        <div className="text-sm text-gray-500">Screne digital aromatherapy</div>

        <button className="rounded-2xl w-max ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs cursor-pointer hover:bg-[#F35C7A] hover:text-white transition-colors">
          Add to Cart
        </button>
      </Link>
      {/* product */}
      <Link
        href={"/"}
        className="flex flex-col gap-4 w-full sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="/product.png"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />

          <Image
            src={"/woman.png"}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Virtual Incense</span>
          <span className="font-bold">$45</span>
        </div>

        <div className="text-sm text-gray-500">Screne digital aromatherapy</div>

        <button className="rounded-2xl w-max ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs cursor-pointer hover:bg-[#F35C7A] hover:text-white transition-colors">
          Add to Cart
        </button>
      </Link>
    </div>
  );
}
