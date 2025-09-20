"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";
import CounterProduct from "./CounterProduct";

interface ProductCardProps {
  product: ProductType;
  isHero?: boolean;
}

export default function ProductCard({
  product,
  isHero = false,
}: ProductCardProps) {
  const {
    turncateText,
    handleAddToCart,
    handleAddToWishlist,
    wishlist,
    cartLoading,
    wishlistLoading,
    cart,
    handleCountOperations,


  } = useAppContext();

  const { _id, imageCover, title, price, description } = product;

  const isWishlisted = wishlist.some((item) => item._id === product._id);
  const alreadyInCart = cart?.data.products.some(
    (item) => item.product._id === product._id
  );

 

  return (
    <>
      {isHero ? (
        <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group cursor-pointer h-full">
          <Link
            href={`/single-product/${_id}`}
            className="block w-full h-full relative"
          >
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
              className="object-cover object-right transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </Link>

          <div className="absolute top-4 left-2 right-2">
            <h3
              className="font-bold text-white leading-tight text-lg md:text-2xl mb-2"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {title}
            </h3>

            <button
              type="button"
              className={`absolute top-0 right-0 p-2 rounded-full  
            transition-colors cursor-pointer shadow-sm z-20
            ${
              isWishlisted
                ? "bg-[#F35C7A] text-white"
                : "bg-white/90 text-black/70 hover:text-white hover:bg-[#F35C7A]"
            }`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAddToWishlist(product);
              }}
            >
              <AiOutlineHeart size={18} />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 w-full flex flex-col justify-between p-6 text-white z-10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
                  <span
                    className="font-bold text-white text-lg"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    EGP {price}
                  </span>
                </div>

                {alreadyInCart ? (
                <CounterProduct count={product.quantity} onIncrement={()=> handleCountOperations("i", product._id, alreadyInCart.count)} onDecrement={()=> handleCountOperations("d", product._id, product.quantity)} />
                ) : (
                    
                )}

                <button
                  type="button"
                  className={`bg-black/40 hover:bg-[#F35C7A] cursor-pointer backdrop-blur-sm border border-white/30 text-white transition-all duration-200 rounded-xl p-2 flex items-center justify-center ${
                    cartLoading === _id ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={cartLoading === _id}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAddToCart(_id);
                  }}
                >
                  {cartLoading === _id ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <HiShoppingCart className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden  shadow-[var(--shadow-card)]  hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group  bg-card h-full flex flex-col">
          {/* Product Image */}
          <Link
            href={`/single-product/${_id}`}
            className="relative w-full  overflow-hidden rounded-t-2xl  h-64 sm:h-80 md:h-96"
          >
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              className={`absolute top-3 right-3 p-2 rounded-full  
            transition-colors cursor-pointer shadow-sm z-20
            ${
              isWishlisted
                ? "bg-[#F35C7A] text-white"
                : "bg-white/90 text-black/70 hover:text-white hover:bg-[#F35C7A]"
            } ${
                wishlistLoading === _id ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAddToWishlist(product);
              }}
              disabled={wishlistLoading === _id}
            >
              <AiOutlineHeart size={18} />
            </button>
          </Link>

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
                className={`rounded-xl transition-colors flex items-center justify-center ${
                  cartLoading === _id
                    ? "opacity-70 cursor-not-allowed pointer-events-none bg-black/40"
                    : "hover:bg-[#F35C7A] cursor-pointer"
                }`}
                onClick={() => handleAddToCart(_id)}
                disabled={cartLoading === _id}
              >
                {cartLoading === _id ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <HiShoppingCart className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
