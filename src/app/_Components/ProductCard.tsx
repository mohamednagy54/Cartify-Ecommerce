"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import Image from "next/image";
import React from "react";
import { HiShoppingCart } from "react-icons/hi";

interface ProductCardProps {
  product: ProductType;
  isHero?: boolean;
}

export default function ProductCard({
  product,
  isHero = false,
}: ProductCardProps) {
  const { turncateText } = useAppContext();

  console.log(product);
  const { imageCover, title, price, description } = product;

  return (
    <>
      {isHero ? (
        <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)]  hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group cursor-pointer h-full ">
          {/* image */}
          <div className="w-full h-full">
            <Image
              src={imageCover}
              alt={title}
              fill
              className="object-cover object-right transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="absolute top-4 left-0 w-full flex flex-col justify-between p-6 text-white  z-10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3
                  className="font-bold text-white leading-tight text-lg md:text-2xl mb-2"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
                  <span
                    className="font-bold text-white text-lg"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    EGP {price}
                  </span>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-black/40 hover:bg-[#F35C7A] backdrop-blur-sm border border-white/30 text-white hover:text-white transition-all duration-200 rounded-xl cursor-pointer"
                >
                  <HiShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>
      ) : (
        <div className="overflow-hidden  shadow-[var(--shadow-card)]  hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group cursor-pointer bg-card h-full flex flex-col">
          {/* Product Image */}
          <div className="relative w-full  overflow-hidden rounded-t-2xl  h-64 sm:h-80 md:h-96">
            <Image
              src={imageCover}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content Below Image */}
          <div className="p-4 bg-card">
            {/* Header with title and price */}
            <div className="space-y-2 mb-4">
              <h3 className="font-bold text-card-foreground leading-tight text-lg">
                {turncateText(title, 20)}
              </h3>
              <p className="text-gray-400 text-sm md:text-base max-w-xs">
                {turncateText(description, 50)}
              </p>
            </div>

            {/* Price and Cart Button */}
            <div className="flex items-center justify-between">
              <div className="bg-primary/10 px-3 py-1.5 rounded-lg">
                <span className="font-bold text-primary text-lg">
                  EGP {product.price}
                </span>
              </div>
              <Button
                size="icon"
                variant="default"
                className="rounded-xl hover:bg-[#F35C7A] transition-colors cursor-pointer"
              >
                <HiShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
