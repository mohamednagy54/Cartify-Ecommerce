"use client";

import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";

import React, { useEffect } from "react";

interface ProductListClientProps {
  initialProducts: ProductType[];
  search?: string;
  useContext?: boolean;
}

export default function ProductListClient({
  initialProducts,
  useContext = false,
}: ProductListClientProps) {
  const { products, setProducts, searchValue, handleAddToCart } =
    useAppContext();

  useEffect(() => {
    if (useContext) {
      setProducts(initialProducts);
    }
  }, [initialProducts, setProducts, useContext]);

  const filtered = searchValue
    ? (useContext ? products : initialProducts).filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : useContext
    ? products
    : initialProducts;

  function turncateText(text: string, maxChars: number) {
    if (text.length <= maxChars) return text;

    return text.slice(0, maxChars) + "...";
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat("En-EG", {
      style: "currency",
      currency: "EGP",
    }).format(value);
  }

  if (!filtered || filtered.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products available at the moment
      </div>
    );
  }

  return (
    <div className="mt-12 flex gap-x-4 gap-y-16 justify-between flex-wrap">
      {filtered?.map((product: ProductType) => {
        const { _id, imageCover, description, price, title, images } = product;

        return (
          <Link
            href={"/single-product/" + _id}
            key={_id}
            className="flex flex-col w-full sm:w-[48%] lg:w-[23%]
   rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
   shadow-lg transition-transform hover:scale-102 hover:shadow-xl"
          >
            <div className="w-full h-80 relative">
              {imageCover && (
                <Image
                  src={imageCover}
                  alt={title || "Product image"}
                  fill
                  sizes="100vw"
                  className="absolute object-cover rounded-t-2xl z-10 hover:opacity-0 transition-opacity ease duration-500"
                />
              )}

              {images && images.length > 1 && images[2] && (
                <Image
                  src={images[2]}
                  alt={title || "Product image"}
                  fill
                  sizes="100vw"
                  className="absolute object-cover rounded-t-2xl"
                />
              )}
            </div>

            <div className="p-4 flex flex-col gap-2 py-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">
                  {turncateText(title, 25)}
                </span>
                <span className="font-bold text-sm">{formatPrice(price)}</span>
              </div>

              <p className="text-xs text-gray-500">
                {turncateText(description, 50)}
              </p>

              <div className="flex justify-between items-center pt-4">
                <button
                  className="mt-2 rounded-2xl w-max ring-1 hover:ring-[#F35C7A] hover:text-[#F35C7A] py-2 px-4 text-xs cursor-pointer bg-[#F35C7A] hover:bg-white text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product._id);
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="mt-2 p-2 rounded-full cursor-pointer text-gray-600 hover:bg-[#F35C7A] hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Added to wishlist:", product._id);
                  }}
                >
                  <AiOutlineHeart size={20} />
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
