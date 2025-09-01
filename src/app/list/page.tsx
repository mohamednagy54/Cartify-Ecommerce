import Image from "next/image";
import React, { Suspense } from "react";
import SkeletonCards from "../_Components/SkeletonCards";
import ProductList from "../_Components/ProductList";
import Filteration from "../_Components/Filteration";
import SearchBar from "../_Components/SearchBar";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { category: categoryId, q: searchVal } = await searchParams;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative pt-25">
      {/* Campaign */}
      <div className="hidden sm:flex bg-pink-50 px-4 justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold text-gray-700 leading-[45px]">
            {" "}
            Grab up to 50% off on
            <br /> Selected Products
          </h1>

          <button className="rounded-3xl py-3 px-5 text-sm bg-[#F35C7A] text-white cursor-pointer hover:bg-white hover:text-[#F35C7A] transition-colors">
            Buy Now
          </button>
        </div>

        <div className="relative w-1/3">
          <Image src="/campaign.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Filter */}
      <Filteration />

      <SearchBar />

      <h1 className="mt-12 text-xl font-semibold">All Products For You!</h1>
      {/* Products */}

      <Suspense fallback={<SkeletonCards />}>
        <ProductList
          useContext={true}
          categoryId={categoryId}
          searchParams={searchVal}
        />
      </Suspense>
    </div>
  );
}
