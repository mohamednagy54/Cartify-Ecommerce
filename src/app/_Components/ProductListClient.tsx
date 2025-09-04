"use client";

import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
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
  const { products, setProducts, searchValue, addToCart } = useAppContext();

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

  if (!filtered || filtered.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products available at the moment
      </div>
    );
  }

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

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {filtered?.map((product: ProductType) => {
        const {
          _id,
          imageCover,
          description,
          price,
          title,
          images,
          priceAfterDiscount,
        } = product;

        return (
          <Link
            href={"/single-product/" + _id}
            key={_id}
            className="flex flex-col gap-4 w-96 mx-auto sm:w-[45%] lg:w-[22%] 
             rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
             shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full h-96">
              {imageCover && (
                <Image
                  src={imageCover}
                  alt={title || "Product image"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
                />
              )}

              {images && images.length > 1 && images[2] && (
                <Image
                  src={images[2]}
                  alt={title || "Product image"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">{turncateText(title, 25)}</span>
              <span className="font-bold">
                {priceAfterDiscount === 0 || priceAfterDiscount === undefined
                  ? formatPrice(price)
                  : formatPrice(priceAfterDiscount)}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              {turncateText(description, 50)}
            </div>

            <button
              className="rounded-2xl w-max ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs cursor-pointer hover:bg-[#F35C7A] hover:text-white transition-colors"
              onClick={() => addToCart(product, 1)}
            >
              Add to Cart
            </button>
          </Link>
        );
      })}
    </div>
  );
}
