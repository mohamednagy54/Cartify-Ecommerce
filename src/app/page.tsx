import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import Link from "next/link";
import DiagonalBanners from "@/components/common/DiagonalBanners";
import ProductList from "@/components/common/ProductList";
import CategoryList from "@/components/common/CategoryList";
import SkeletonCards from "@/components/common/SkeletonCards";
import SliderComponent from "@/components/common/SliderComponent";
import BrandsSlider from "@/components/common/BrandsSlider";

export default function Home() {
  return (
    <div className="">
      <SliderComponent />

      <div className="my-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40">
        <div className="w-full mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
            {/* Left Card */}
            <div className="relative  rounded-2xl overflow-hidden shadow-md min-h-[400px]">
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.pexels.com/photos/9604298/pexels-photo-9604298.jpeg?_gl=1*d26x4x*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTc5MzgzMjQkbzE0JGcxJHQxNzU3OTM4NjM2JGoxNyRsMCRoMA.."
                    alt="Elegant male model in cream and beige clothing"
                    fill
                    sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 100vw, 
         100vw"
                    className="object-cover object-center "
                  />
                </div>
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-deep-brown/60 via-deep-brown/20 to-transparent">
                <div className="flex items-end justify-between">
                  <h2 className="text-3xl md:text-4xl font-medium text-white leading-relaxed flex-1">
                    Where dreams meet couture
                  </h2>
                  <Link href="/list">
                    <Button
                      size="lg"
                      className="rounded-full ml-6 text-black bg-white hover:text-white hover:bg-[#F35C7A] transition-colors cursor-pointer"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative  rounded-2xl overflow-hidden shadow-md min-h-[400px]">
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.pexels.com/photos/18159348/pexels-photo-18159348.jpeg?_gl=1*13a1tgr*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTc5MzgzMjQkbzE0JGcxJHQxNzU3OTM5MTk5JGoxNSRsMCRoMA.."
                    alt="Elegant male model in cream and beige clothing"
                    fill
                    sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 100vw, 
         100vw"
                    className="object-cover object-center "
                  />
                </div>
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-deep-brown/60 via-deep-brown/20 to-transparent">
                <div className="flex items-end justify-between">
                  <h2 className="text-3xl md:text-4xl font-medium text-white leading-relaxed flex-1">
                    Enchanting styles
                    <br />
                    for every man
                  </h2>
                  <Link href="/list">
                    <Button
                      size="lg"
                      className="rounded-full ml-6 text-black bg-white hover:text-white hover:bg-[#F35C7A] transition-colors cursor-pointer"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40">
        <h1 className="text-3xl font-extrabold mb-12 uppercase tracking-normal">
          Brands
        </h1>

        <BrandsSlider />
      </div>

      <div className="py-24">
        <DiagonalBanners />
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40">
        <h1 className="text-3xl font-extrabold mb-12 uppercase tracking-normal">
          Featured Products
        </h1>
        <Suspense fallback={<SkeletonCards />}>
          <ProductList limit={10} filterType="ratingsAverage" variant="grid" />{" "}
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40">
        <h1 className="text-3xl font-extrabold mb-12 uppercase tracking-normal">
          Categories
        </h1>

        <Suspense fallback={<SkeletonCards />}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40">
        <h1 className="text-3xl font-extrabold mb-12 uppercase tracking-normal">
          New Products
        </h1>
        <Suspense fallback={<SkeletonCards />}>
          <ProductList limit={4} filterType="price" variant="default" />
        </Suspense>
      </div>
    </div>
  );
}
