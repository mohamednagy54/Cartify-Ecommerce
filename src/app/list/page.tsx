import Filteration from "@/components/common/Filteration";

import ProductListClient from "@/components/common/ProductListClient";

import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "All Products | Cartify",
  description:
    "Explore our wide range of products and grab amazing deals at Cartify.",
};

export default async function ProductsPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-24 relative">
      {/* Campaign */}
      <div className="hidden sm:flex bg-pink-50 px-4 justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold text-gray-700 leading-[45px]">
            {" "}
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
        </div>

        <div className="relative w-1/3">
          <Image
            src="/campaign.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 0vw, 33vw"
            priority
          />
        </div>
      </div>

      {/* Filter */}
      <Filteration />

      <h1 className="mt-12 text-xl font-semibold">All Products For You!</h1>
      {/* Products */}

      <ProductListClient />
    </div>
  );
}
